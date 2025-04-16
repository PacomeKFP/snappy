import {io, Socket} from "socket.io-client";
import {Message} from "./models";
import {ISnappySocketClient} from "./ISnappySocketClient";

export class SnappySocketClient implements ISnappySocketClient {
    projectId: string
    user: string
    server: string
    baseUrl: string
    socket?: Socket

    constructor(server: string, projectId: string, user: string) {
        this.user = user
        this.server = server
        this.projectId = projectId
        this.baseUrl = `${server}?projectId=${projectId}&user=${user}`
    }

    initialize(client: ISnappySocketClient = this, force: boolean = false) {
        if (this.socket && !force) {
            return
        }
        const socket = io(this.baseUrl)

        socket.on("connect", () => client.onConnect())
        socket.on("disconnect",() => client.onDisconnect())

        socket.on("new-connection", (data:string) =>client.newConnectionListener(data))
        socket.on("new-disconnection", client.newDisconnectionListener)

        socket.on('message-send', (message: Message, messageReceivedCallback: () => void) => {
                client.onMessageReceivedListener(message);
                messageReceivedCallback()
            }
        )

        this.socket = socket;
    }

    onConnect() {
        console.log("Connected")
    }

    onDisconnect() {
        console.log("Disconnected")
    }

    newConnectionListener(user: string) {
        console.log("new connection \nuser -> ", user)
    }

    newDisconnectionListener(user: string) {
        console.log("new disconnection  \nuser -> ", user)
    }

    onMessageReceivedListener(message: Message) {
        console.log("message received")
        console.log(message)
    }
}