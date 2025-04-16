import {ChatService} from "@/services/contact-service";

export const fetchUsers = async ()=>{
        return ChatService.getViewContact();
      }