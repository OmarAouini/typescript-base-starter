import 'dotenv/config'
import express from 'express';

const app = express()
const PORT = 8080

//healthcheck endpoint
app.get("/", (req, res) => {
    res.sendStatus(200)
})

export function funzione(params:any) {
    return params
}

//run
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`))
