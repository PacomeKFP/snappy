import {Message} from "./models";

export interface ISnappySocketClient {
    onConnect: () => void

    onDisconnect: () => void

    newConnectionListener: (user: string) => void

    newDisconnectionListener: (user: string) => void

    onMessageReceivedListener: (message: Message) => void
}