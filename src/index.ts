import 'dotenv/config'
import express from 'express';

const app = express()
const HOST = '0.0.0.0';
const PORT = '8080'

//healthcheck endpoint
app.get("/", (req, res) => {
    res.sendStatus(200)
})

//run
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`))



export function funzione(params:any) {
    return params
}