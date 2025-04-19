import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetChatDetailsDto } from "@/lib/models";
import { Alert } from "react-native";
import { API_URL, PROJECT_ID } from '@/lib/constants'; 

export class ChatService {
    private static api = new SnappyHTTPClient(API_URL);


  private static async getRequesterId(): Promise<string> {
    const localUser = await AsyncStorage.getItem("user");
    if (localUser) {
      return JSON.parse(localUser).externalId;
    }
    return this.api.getUser()!.externalId!;
  }


    public static async getUserChat() {

        // verifier s'il y a déja la liste des conversations dans l'AsyncStorage
        const chats = await AsyncStorage.getItem("chats")

        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if (chats)
            return JSON.parse(chats)

        // si non, on execute la suite
     

        const onlineChats = await this.api.getUserChats(await (async () => {
            const value = await AsyncStorage.getItem("user");
            if (value !== null) {
                // We have data!!
                return JSON.parse(value).externalId;
            }
            return this.api.getUser()!.externalId!;
        })(),PROJECT_ID);

        //enregistre les chats en local
        AsyncStorage.setItem("chats", JSON.stringify(onlineChats))

        return onlineChats;

    }

    public static async getChatDetails(name: string) {

        //recherche l'Id de l'utilisateur à partir de son nom
        const users = await this.api.filterUserByDisplayName({ "displayName": name, "projectId":PROJECT_ID });
        const interlocutorId = users[0]!.externalId!;
     
        // verifier s'il y a déja la conversation en question dans le AsyncStorage
        const chatDetails = await AsyncStorage.getItem(interlocutorId);

        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if (chatDetails)
            return JSON.parse(chatDetails)

        // si non, on execute la suite

        const chatDetailsDto: GetChatDetailsDto = {
            user: (await this.getRequesterId()).toString(),
            interlocutor: interlocutorId,
            projectId:PROJECT_ID
        };
        const onlineChatDetails = await this.api.getChatDetails(chatDetailsDto);
        //enregistre les messages en local
        AsyncStorage.setItem(interlocutorId, JSON.stringify(onlineChatDetails))

        return onlineChatDetails;

    }

    public static async sendMessage(body: string, receiverName: string,messages:any,setMessages:any) {

        
        //recherche l'Id de l'utilisateur à partir de son nom
        const users = await this.api.filterUserByDisplayName({ "displayName": receiverName, "projectId":PROJECT_ID });
        const interlocutorId = users[0]!.externalId!;
    
        //mise à jour du messages dasns chatItem

        setMessages([...messages, { id: Date.now().toString(), body: body, sender:  (await this.getRequesterId()).toString(), receiver:interlocutorId,ack: "SENT", createdAt: new Date() }]);
        //logique d'envoi de message
        await this.api.sendMessage({
            "body": body,
            "projectId":PROJECT_ID,
            "receiverId": interlocutorId,
            "senderId":  (await this.getRequesterId()).toString()
        }).then(async (res) => {
            // si le message est envoyé avec succès, on l'ajoute à la liste des messages
            if (res) {
                const chatDetails = await AsyncStorage.getItem(interlocutorId);
                if (chatDetails) {
                    const chatDetailsParsed = JSON.parse(chatDetails);
                    chatDetailsParsed.push(res);
                    AsyncStorage.setItem(interlocutorId, JSON.stringify(chatDetailsParsed));
                }
            }
        }).catch((err) => {
            console.log(err);
            // si le message n'est pas envoyé, on affiche une alerte
            Alert.alert("Erreur d'envoi", "Le message n'a pas pu être envoyé. Veuillez réessayer plus tard."+err);
        });
    }

}