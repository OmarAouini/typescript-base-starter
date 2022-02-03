import 'dotenv/config'
import express from 'express';
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require("compression");

const app = express()
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
app.get("/", (_, res) => {
    res.sendStatus(200)
})

export function funzione(params:any) {
    return params
}

//run
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`))
