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
        
        // si non, 
        // stocker le résultat de l'appel d'API dans l'AsyncStorage et retourner
        const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
        const projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

        const onlineChats = await snappy.getUserChats(snappy.getUser()!.externalId!, projectId);
       
        //enregistre les chats en local
        AsyncStorage.setItem("chats", JSON.stringify(onlineChats))

        return onlineChats;
        
    }

    public static async getChatDetails(interlocutorId: string){

        // verifier s'il y a déja la conversation en question dans le AsyncStorage
        const chatDetails =await  AsyncStorage.getItem(interlocutorId);
        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if(chatDetails)
            return JSON.parse(chatDetails)
        
        // si non, on execute la suite
        const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
        const projectId =  "81997082-7e88-464a-9af1-b790fdd454f8";

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