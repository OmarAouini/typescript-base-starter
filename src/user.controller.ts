import { Request, Response, Router } from "express"
import { ApiResponse } from "./api_utils"
import { prisma } from "./db"

export class UserController {
    public router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    findall = (_req: Request, res: Response) => {
        prisma.post.findMany({}).then(data => {
            return res.json(new ApiResponse("OK", data))
        }).catch(err => {
            return res.status(500).json(new ApiResponse("KO", err))
        })
    }

    findByid = (req: Request, res: Response) => {
        prisma.post.findUnique({
            where: {
                id: parseInt(req.params.id)
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

    public routes() {
        this.router.get('/', this.findall)
        this.router.get('/:id', this.findByid)
    }
}