import { Company } from "@prisma/client";
import { Request, Response, Router } from "express";
import { ApiResponse } from "./api_utils";
import { prisma } from "./db";
import { CreateCompanyDTO } from "./dto";
import { validateAndConvert } from "./validators";

export class CompanyController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  findall = async (_req: Request, res: Response) => {
    await prisma.company
      .findMany({
        include: {
            employees: true,
            projects: true
        },
      })
      .then((data) => {
        return res.json(new ApiResponse<Company[]>("OK", data));
      })
      .catch((err) => {
        return res.status(500).json(new ApiResponse<Error>("KO", err));
      });
  };

  findByid = async (req: Request, res: Response) => {
    await prisma.company
      .findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          employees: true,
          projects: true
        },
      })
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json(
              new ApiResponse("KO", `company with id ${req.params.id} not found`)
            );
        }
        return res.json(new ApiResponse<Company>("OK", data));
      })
      .catch((err) => {
        return res.status(500).json(new ApiResponse<Error>("KO", err));
      });
  };

  add = async (req: Request, res: Response) => {
    const conversionResult = await validateAndConvert(CreateCompanyDTO, req.body);
    if (conversionResult.error) {
      return res
        .status(400)
        .json(new ApiResponse<Error>("KO", conversionResult.error));
    }
    await prisma.company
      .create({
        data: conversionResult.data,
      })
      .then((data) => {
        return res.status(201).json(new ApiResponse<Company>("OK", data));
      })
      .catch((err) => {
        return res.status(500).json(new ApiResponse<Error>("KO", err));
      });
  };

  update = async (req: Request, res: Response) => {
    const conversionResult = await validateAndConvert(CreateCompanyDTO, req.body);
    if (conversionResult.error) {
      return res
        .status(400)
        .json(new ApiResponse<Error>("KO", conversionResult.error));
    }
    await prisma.company
      .update({
          where: {
              id: parseInt(req.params.id)
            },
          data: {
            name: conversionResult.data.name,
            email: conversionResult.data.email,
            address: conversionResult.data.address,
            phone_number: conversionResult.data.phone_number,
            vat_code:  conversionResult.data.vat_code
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
