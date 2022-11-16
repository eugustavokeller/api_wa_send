import express, { Request, Response } from "express"
import { allowedNodeEnvironmentFlags } from "process";
import Sender from "./sender";

const sender = new Sender()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
    // ...
})

app.post('/send', async (req: Request, res: Response) => {
    try {
        await sender.sendText("554891893541@c.us", "Mensagem de teste")
    } catch (error) {
        console.error("error", error)
        res.status(500).json({status: "error", message: error})
    }
})