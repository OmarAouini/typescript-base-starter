import { Task } from "@prisma/client";
import { Request, Response, Router } from "express";
import { ApiResponse } from "../api_utils";
import { prisma } from "../db";
import { CreateTaskDTO } from "../dto";
import { validateAndConvert } from "../validators";

export class TaskController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  findall = async (_req: Request, res: Response) => {
    await prisma.task
      .findMany({
        include: {
           employees: true,
           project: true
        },
      })
      .then((data) => {
        return res.json(new ApiResponse<Task[]>("OK", data));
      })
      .catch((err) => {
        return res.status(500).json(new ApiResponse<Error>("KO", err));
      });
  };

  findByid = async (req: Request, res: Response) => {
    await prisma.task
      .findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          employees: true,
          project: true
        },
      })
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json(
              new ApiResponse("KO", `Task with id ${req.params.id} not found`)
            );
        }
        return res.json(new ApiResponse<Task>("OK", data));
      })
      .catch((err) => {
        return res.status(500).json(new ApiResponse<Error>("KO", err));
      });
  };

  add = async (req: Request, res: Response) => {
    const conversionResult = await validateAndConvert(CreateTaskDTO, req.body);
    if (conversionResult.error) {
      return res
        .status(400)
        .json(new ApiResponse<Error>("KO", conversionResult.error));
    }
    await prisma.task
      .create({
        data: conversionResult.data,
      })
      .then((data) => {
        return res.status(201).json(new ApiResponse<Task>("OK", data));
      })
      .catch((err) => {
        return res.status(500).json(new ApiResponse<Error>("KO", err));
      });
  };

  update = async (req: Request, res: Response) => {
    const conversionResult = await validateAndConvert(CreateTaskDTO, req.body);
    if (conversionResult.error) {
      return res
        .status(400)
        .json(new ApiResponse<Error>("KO", conversionResult.error));
    }
    await prisma.task
      .update({
          where: {
              id: parseInt(req.params.id)
            },
          data: {
            title: conversionResult.data.title,
            category: conversionResult.data.category,
            description: conversionResult.data.description,
            start_at: new Date(conversionResult.data.start_at),
            updated_at: new Date(conversionResult.data.updated_at),
            end_at: new Date(conversionResult.data.end_at),
            project_id: conversionResult.data.project_id
          }
      })
      .then((data) => {
        return res.status(200).json(new ApiResponse("OK", data));
      })
      .catch((err) => {
        return res.status(500).json(new ApiResponse<Error>("KO", err));
      });
  };


  public routes() {
    this.router.get("/", this.findall);
    this.router.get("/:id", this.findByid);
    this.router.put("/:id", this.update);
    this.router.post("/", this.add);
  }
}
