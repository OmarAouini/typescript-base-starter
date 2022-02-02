import 'dotenv/config'
import express from 'express';

const app = express()
const PORT = process.env.PORT

//healthcheck endpoint
app.get("/", (req, res) => {
    res.sendStatus(200)
})

//run
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`))