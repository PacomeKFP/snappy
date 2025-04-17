import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetChatDetailsDto } from "@/lib/models";
import { Alert } from "react-native";

export class ChatService {

    public static async getUserChat() {

        // verifier s'il y a déja la liste des conversations dans l'AsyncStorage
        const chats = await AsyncStorage.getItem("chats")

        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if (chats)
            return JSON.parse(chats)

        // si non, on execute la suite
        const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
        const projectId = "81997082-7e88-464a-9af1-b790fdd454f8"

        const onlineChats = await snappy.getUserChats(await (async () => {
            const value = await AsyncStorage.getItem("user");
            if (value !== null) {
                // We have data!!
                return JSON.parse(value).externalId;
            }
            return snappy.getUser()!.externalId!;
        })(), projectId);

        //enregistre les chats en local
        AsyncStorage.setItem("chats", JSON.stringify(onlineChats))

        return onlineChats;

    }

    public static async getChatDetails(name: string) {

        const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
        const projectId = "81997082-7e88-464a-9af1-b790fdd454f8"

        //recherche l'Id de l'utilisateur à partir de son nom
        const users = await snappy.filterUserByDisplayName({ "displayName": name, "projectId": projectId });
        const interlocutorId = users[0]!.externalId!;
        const userId = await (async () => {
            const value = await AsyncStorage.getItem("user");
            if (value !== null) {
                // We have data!!
                return JSON.parse(value).externalId;
            }
            return snappy.getUser()!.externalId!;
        })();
        // verifier s'il y a déja la conversation en question dans le AsyncStorage
        const chatDetails = await AsyncStorage.getItem(interlocutorId);

        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if (chatDetails)
            return JSON.parse(chatDetails)

        // si non, on execute la suite

        const chatDetailsDto: GetChatDetailsDto = {
            user: userId,
            interlocutor: interlocutorId,
            projectId
        };
        const onlineChatDetails = await snappy.getChatDetails(chatDetailsDto);
        //enregistre les messages en local
        AsyncStorage.setItem(interlocutorId, JSON.stringify(onlineChatDetails))

        return onlineChatDetails;

    }

    public static async sendMessage(body: string, receiverName: string,messages:any,setMessages:any) {

        
        const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
        const projectId = "81997082-7e88-464a-9af1-b790fdd454f8"

        //recherche l'Id de l'utilisateur à partir de son nom
        const users = await snappy.filterUserByDisplayName({ "displayName": receiverName, "projectId": projectId });
        const interlocutorId = users[0]!.externalId!;
        const userId = await (async () => {
            const value = await AsyncStorage.getItem("user");
            if (value !== null) {
                // We have data!!
                return JSON.parse(value).externalId;
            }
            return snappy.getUser()!.externalId!;
        })();

        //mise à jour du messages dasns chatItem

        setMessages([...messages, { id: Date.now().toString(), body: body, sender: userId, receiver:interlocutorId,ack: "SENT", createdAt: new Date() }]);
        //logique d'envoi de message
        await snappy.sendMessage({
            "body": body,
            "projectId": projectId,
            "receiverId": interlocutorId,
            "senderId": userId
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