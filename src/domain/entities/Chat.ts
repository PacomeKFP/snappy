interface Chat {
    id: string;
    projectId: string;
    sender: string;
    receiver: string;
    mode: "OFF" | "LISTEN" | "ON";
    createdAt: string;
    updatedAt: string;
}
interface GetChatDetailsDto {
    user: string;
    interlocutor: string;
}
interface SendMessageDto {
    senderId: string;
    receiverId: string;
    body: string;
    attachments?: string[]; // Assuming binary files are handled as strings
    projectId: string;
}

interface ChangeMessagingModeDto {
    requesterId: string;
    interlocutorId: string;
    targetMode: "OFF" | "LISTEN" | "ON";
    projectId: string;
}
interface Attachment {
    id: string;
    mimetype: string;
    filename: string;
    filesize: number;
    createdAt: string;
    updatedAt: string;
    path: string;
}
interface Message {
    id: string;
    projectId: string;
    body: string;
    ack: "SENT" | "RECEIVED" | "READ";
    sender: UserProjection;
    receiver: UserProjection;
    attachments: Attachment[];
    createdAt: string;
    updatedAt: string;
    writtenByHuman: boolean;
}
interface ChatResource {
    user: User;
    lastMessage: Message;
}