import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js"
import { PhoneNumber } from "libphonenumber-js"
import { start } from "repl"
import { create, Whatsapp, Message, SocketState } from "venom-bot"
import { toRaw } from "vue"

class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    async sendText(to: string, body: string) {
        // 554891893541@c.us

        if(!isValidPhoneNumber(to, "BR")) {
            throw new Error("this number is not valid")
        }

        let phoneNumber = parsePhoneNumber(to, "BR")
            ?.format("E.164")
            ?.replace("+", "") as string

        phoneNumber = phoneNumber.includes("@c.us") 
            ? phoneNumber 
            : `${phoneNumber}@c.us`
        
        await this.client.sendText(phoneNumber, body);
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