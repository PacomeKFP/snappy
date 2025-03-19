import {io, Socket} from "socket.io-client";

export class SnappySocketClient {
    projectId: string
    user: string
    server: string
    baseUrl: string

    socket?: Socket

    constructor(server: string, projectId: string, user: string) {
        this.server = server
        this.projectId = projectId
        this.user = user
        this.baseUrl = `ws://16.171.151.193:3305/?projectId=f7cbddc0-1ec9-4c03-9722-7be546605919&user=ext2`

        this.socket = this.setupSocket()
    }

    setupSocket() {
        const socket = io(this.baseUrl,  {
            path:"/"
        })

        socket.on("connect", this.connect)
        socket.on("disconnect", this.disconnect)
        socket.on("new-connection", this.newConnectionListener)
        socket.on("new-disconnection", this.newDisconnectionListener)

        socket.on('message-send', this.onMessageReceivedListener)

        socket.on('message-ack-read', this.onMessageReadAckListener)
        socket.on('message-ack-received', this.onMessageReceivedAckListener)

        return socket;
    }

    connect() {
        console.log("Connected")
    }

    disconnect() {
        console.log("Disconnected")
    }

    test() {
        console.log("test")
    }

    newConnectionListener() {
        console.log("new connection")
    }
    newDisconnectionListener() {
        console.log("new disconnection")
    }
    onMessageReceivedListener() {
        console.log("message received")
    }

    onMessageReceivedAckListener() {
        console.log("message received")
    }

    onMessageReadAckListener() {
        console.log("message received")
    }


}