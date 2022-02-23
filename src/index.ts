import 'dotenv/config'
import express, { Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from "compression";
import { Customer } from './customers/customer.model';

const app = express()
const HOST = '0.0.0.0'
const PORT = 8080

// middlewares
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"]}))
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(compression());


//healthcheck endpoint
app.get("/health" ,(_, res: Response) => {
   res.status(200).json({"message": "OK"})
})

//404 handler
app.get('*', (_, res: Response) => {
    res.sendStatus(404);
  });

//run
app.listen(PORT, HOST, () => console.log(`app is listening on port ${HOST}:${PORT}`))
