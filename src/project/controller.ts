import { Router,Request, Response } from "express";

export class ProjectController {
    public router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }


    public all = (_req:Request,res:Response) => {
        res.send('index all')
    }

    public routes() {
        this.router.get("/", this.all)
    }
}