import express, { Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from "compression";
import 'dotenv/config'
import { UserController } from './controllers/user.controller';
import jwt from 'express-jwt';
import { API_VERSION, JWT_SECRET, HOST, PORT } from './constants';
import { ApiResponse } from './api_utils';
import { CompanyController } from './controllers/company.controller';
import { EmployeeController } from './controllers/employee.controller';
import { ProjectController } from './controllers/project.controller';
import { TaskController } from './controllers/task.controller';

export class Server {
    
    private app: express.Application
    private userController: UserController;
    private companyController: CompanyController;
    private employeeController: EmployeeController;
    private projectController: ProjectController;
    private taskController: TaskController;

    constructor() {
        //express
        this.app = express()
        this.configuration()
        //controllers
        this.userController = new UserController()
        this.companyController = new CompanyController()
        this.employeeController = new EmployeeController()
        this.projectController = new ProjectController()
        this.taskController = new TaskController()
        //routes
        this.routes()
    }

    public configuration() {
        this.app.set('port', PORT)
        this.app.set('host', HOST)
        this.app.use(express.json())
        this.app.use(cors({
            origin: ["*"],
            methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"], 
            allowedHeaders: ["Content-Type", "Authorization"]}))
        this.app.use(helmet())
        this.app.use(morgan("common"))
        this.app.use(compression());
        this.app.use(jwt({
            secret: JWT_SECRET || "",
            algorithms: ['HS256'],
            credentialsRequired: true,
            getToken: (req) => {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    // validation jwt logic, then return token
                    let token_string = req.headers.authorization.split(' ')[1];
                    return token_string
                } else if (req.query && req.query.token) {
                  return req.query.token;
                }
                return null;
            }
          }).unless({path: [/^\/api\/.*\/public\/.*/]})) // exclude auth check for api with path: /api/${API_VERSION}/public
    }

    public async routes() {
        const api_version = API_VERSION
        //users
        this.app.use(`/api/${api_version}/public/users`, this.userController.router)
        this.app.use(`/api/${api_version}/protected/users`, this.userController.router)
        //company
        this.app.use(`/api/${api_version}/public/companies`, this.companyController.router)
        //employees
        this.app.use(`/api/${api_version}/public/employees`, this.employeeController.router)
        //projects
        this.app.use(`/api/${api_version}/public/projects`, this.projectController.router)
        //tasks
        this.app.use(`/api/${api_version}/public/tasks`, this.taskController.router)
     
        this.app.get(`/api/${api_version}/public/health` ,(_, res: Response) => {
            res.status(200).json(new ApiResponse<string>("OK", "health"))
         })

         //401 unauthorized handler
         this.app.use(function (err, _req, res, _next) {
            if (err.name === 'UnauthorizedError') {
                res.status(401).send(new ApiResponse<string>("KO","unauthorized"));
            }
        });
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
