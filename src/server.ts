import express, { Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from "compression";
import 'dotenv/config'
import { UserController } from './user.controller';

export class Server {
    
    private app: express.Application
    private userController: UserController;
    // private projectController: ProjectController;

    constructor() {
        //express
        this.app = express()
        this.configuration()
        //controllers
        this.userController = new UserController()
        //routes
        this.routes()

    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3000)
        this.app.set('host', "0.0.0.0")
        this.app.use(express.json())
        this.app.use(cors({
            origin: ["*"],
            methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"], 
            allowedHeaders: ["Content-Type", "Authorization"]}))
        this.app.use(helmet())
        this.app.use(morgan("common"))
        this.app.use(compression());
    }

    public async routes() {
        this.app.use('/api/users', this.userController.router)
        // this.app.use('/api/companies', this.companyController.router)
        // this.app.use('/api/projects', this.projectController.router)

        this.app.get("/health" ,(_, res: Response) => {
            res.status(200).json({"message": "OK"})
         })
         //404 handler
        this.app.get('*', (_, res: Response) => {
            res.sendStatus(404);
        });
    }

    public start() {
        this.app.listen(this.app.get('port'), this.app.get('host'), () =>{
            console.log(`server is listening on ${this.app.get('host')}:${this.app.get('port')}`)
        })
    }
}
