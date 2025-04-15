import {ChatService} from "@/services/chat-service";

export const fetchChats =async()=>{
    return await ChatService.getUserChat();
}