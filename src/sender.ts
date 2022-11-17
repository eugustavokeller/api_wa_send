import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js"
import { PhoneNumber } from "libphonenumber-js"
import { type } from "os"
import { start } from "repl"
import { create, Whatsapp, Message, SocketState } from "venom-bot"
import { toRaw } from "vue"

export type QRcode = {
    base64Qr: string
    attempts: number
}

class Sender {
    private client: Whatsapp
    private connected: boolean;
    private qr: QRcode;


    get isConnected(): boolean {
        return this.connected
    }

    get qrCode(): QRcode {
        return this.qr
    }


    constructor() {
        this.initialize()
    }

    async sendText(to: string, body: string) {
        // 554891893541@c.us

        if (!isValidPhoneNumber(to, "BR")) {
            throw new Error("this number is not valid")
        }

        let phoneNumber = parsePhoneNumber(to, "BR")
            ?.format("E.164")
            ?.replace("+", "") as string

        phoneNumber = phoneNumber.includes("@c.us")
            ? phoneNumber
            : `${phoneNumber}@c.us`

        console.log("phoneNumber", phoneNumber)

        await this.client.sendText(phoneNumber, body);
    }

    private initialize() {
        const qr = (
            base64Qr: string, 
            asciiQR: string, 
            attempts: number, 
            urlCode: string
        ) => {
            this.qr = { base64Qr, attempts}
        }

        const status = (statusSession: string) => {
            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(
                statusSession
            )
        }

        const start = (client: Whatsapp) => {
            this.client = client

            client.onStateChange((state) => {
                this.connected = state === SocketState.CONNECTED
            })
        }

        create('api_wa_send', qr, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }
}

export default Sender