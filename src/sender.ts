import { start } from "repl"
import { create, Whatsapp, Message, SocketState } from "venom-bot"

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    private initialize() {

        const qr = (base64Qrimg: string) => {}

        const status = (statusSession: string) => {}

        const start = (client: Whatsapp) => {
            this.client = client
        }

        create('api_wa_send', qr, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }
}

export default Sender