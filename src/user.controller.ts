import { Request, Response, Router } from "express"
import { ApiResponse } from "./api_utils"
import { prisma } from "./db"

export class UserController {
    public router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    findall = async (_req: Request, res: Response) => {
        await prisma.user.findMany({
            include: {
                posts: true,
                profile: true

            }
        }).then(data => {
            return res.json(new ApiResponse("OK", data))
        }).catch(err => {
            return res.status(500).json(new ApiResponse("KO", err))
        })
    }

    findByid = async (req: Request, res: Response) => {
        await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                posts: true,
                profile: true
            }
        }).then(data => {
            if (!data) {
                return res.status(404).json(new ApiResponse("KO",`user with id ${req.params.id} not found`))
            }
            return res.json(new ApiResponse("OK", data))
        }).catch(err => {
            return res.status(500).json(new ApiResponse("KO", err))
        })
    }

    add = async (req:Request, res:Response) => {
        if (!req.body) {
            return res.status(400).json(new ApiResponse("KO", "missing body"))
        }
        await prisma.user.create({
            data: req.body
        }).then(data => {
            return res.status(201).json(new ApiResponse("OK", data))
        }).catch(err => {
            return res.status(500).json(new ApiResponse("KO", err))
        })
    }

    public routes() {
        this.router.get('/', this.findall)
        this.router.get('/:id', this.findByid)
        this.router.post('/', this.add)
    }
}