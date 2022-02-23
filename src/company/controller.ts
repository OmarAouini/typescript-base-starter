import { Router, Request, Response } from "express"
import { CompanyService } from "./service";


export class CompanyController {
    public router: Router;
    private companyService: CompanyService;

    constructor() {
        this.router = Router()
        this.companyService = new CompanyService()
        this.routes()
    }

    public all = (_req:Request,res:Response) => {
        res.send(this.companyService.all())
    }

    public routes() {
        this.router.get("/", this.all)
    }
}