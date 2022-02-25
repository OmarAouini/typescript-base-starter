import express, { Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from "compression";
import 'dotenv/config'
import { UserController } from './user.controller';
import jwt from 'express-jwt';

export class Server {
    
    private app: express.Application
    private userController: UserController;

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
        this.app.set('port', process.env.PORT || 8080)
        this.app.set('host', process.env.HOST || "0.0.0.0")
        this.app.use(express.json())
        this.app.use(cors({
            origin: ["*"],
            methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"], 
            allowedHeaders: ["Content-Type", "Authorization"]}))
        this.app.use(helmet())
        this.app.use(morgan("common"))
        this.app.use(compression());
        this.app.use(jwt({
            secret: process.env.JWT_SECRET || "",
            algorithms: ['HS256'],
            credentialsRequired: true,
            getToken: function fromHeaderOrQuerystring (req) {
              if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                  return req.headers.authorization.split(' ')[1];
              } else if (req.query && req.query.token) {
                return req.query.token;
              }
              return null;
            }
          }).unless({path: '/public'})) // path starting with public no auth
    }

    public async routes() {
        this.app.use('/api/users', this.userController.router)
     
        this.app.get("/health" ,(_, res: Response) => {
            res.status(200).json({"message": "OK"})
         })
         //404 handler
        this.app.get('*', (_, res: Response) => {
            res.sendStatus(404);
        });
         //401 handler
         this.app.get('*', (_, res: Response) => {
            res.sendStatus(401);
        });
    }

    public start() {
        this.app.listen(this.app.get('port'), this.app.get('host'), () =>{
            console.log(`server is listening on ${this.app.get('host')}:${this.app.get('port')}`)
        })
    }
}
