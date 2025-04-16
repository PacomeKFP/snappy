
import { ChatService } from "@/services/chat-service";

export const fetchChatDetails = async (name) => {
    return await ChatService.getChatDetails(name);
}