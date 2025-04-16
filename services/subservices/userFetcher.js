import {ChatService} from "@/services/chat-service";

export const fetchUsers = async ()=>{
        return ChatService.getViewContact();
      }