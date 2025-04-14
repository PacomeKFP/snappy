import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatResource } from '../lib/models/chat-resource';
import { GetChatDetailsDto } from "@/lib/models";

export class ChatService{

    public static async getUserChat(){

        // verifier s'il y a déja la liste des conversations dans l'AsyncStorage
        const chats =await  AsyncStorage.getItem("chats")
        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if(chats)
            return JSON.parse(chats)
        
        // si non, on execute la suite
        const snappy = new SnappyHTTPClient("")
        const projectId = ""

        const onlineChats = await snappy.getUserChats(snappy.getUser()!.externalId!, projectId);
        AsyncStorage.setItem("chats", JSON.stringify(onlineChats))
        return onlineChats;
        // stocker le résultat de l'appel d'API dans l'AsyncStorage et retourner
    }

    public static async getChatDetails(interlocutorId: string){

        // verifier s'il y a déja la conversation en question dans le AsyncStorage
        const chatDetails =await  AsyncStorage.getItem(interlocutorId);
        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if(chatDetails)
            return JSON.parse(chatDetails)
        
        // si non, on execute la suite
        const snappy = new SnappyHTTPClient("")
        const projectId = ""

        const chatDetailsDto: GetChatDetailsDto={
            user: snappy.getUser()!.externalId!,
            interlocutor: interlocutorId,
            projectId
        };
        const onlineChatDetails = await snappy.getChatDetails(chatDetailsDto);
        AsyncStorage.setItem(interlocutorId, JSON.stringify(onlineChatDetails))
        return onlineChatDetails;
        // stocker le résultat de l'appel d'API dans l'AsyncStorage et retourner
    }
}