import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatResource, GetChatDetailsDto, Message } from "@/lib/models";
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

    public static async getChatDetails(name: string):Promise<Message []> {

        //recherche l'Id de l'utilisateur à partir de son nom
        const users = await this.api.filterUserByDisplayName({ "displayName": name, "projectId": PROJECT_ID });
        const interlocutorId = users[0]!.externalId!;

        // verifier s'il y a déja la conversation en question dans le AsyncStorage
        const chatDetails = await AsyncStorage.getItem(interlocutorId);

        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if (chatDetails)
            return JSON.parse(chatDetails)

        // si non, on fait une requete

        const chatDetailsDto: GetChatDetailsDto = {
            "user": (await this.getRequesterId()).toString(),
            "interlocutor": interlocutorId,
            "projectId": PROJECT_ID
        };
        console.log("Données envoyées au serveur getChatDetails:", chatDetailsDto);

        try {
            const onlineChatDetails = await this.api.getChatDetails(chatDetailsDto);

            if (!onlineChatDetails) {
                console.warn("Aucune donnée reçue du serveur.");
                return [];
              }
            //enregistre les messages en local
            AsyncStorage.setItem(interlocutorId, JSON.stringify(onlineChatDetails.messages))
            return onlineChatDetails.messages || [];
        }    catch (error) {
              console.error("Erreur:", error);
        }

    }

    public static async sendMessage(body: string, receiverName: string, messages: any, setMessages: any) {

        console.log("envoie du message", body)

        //Recherche de l'interloccutor par son nom
        const users = await this.api.filterUserByDisplayName({
            "displayName": receiverName,
            "projectId": PROJECT_ID
        });
        const interlocutorId = users[0]!.externalId!;

        //mise à jour du messages dasns chatItem
        try {
            setMessages([...messages,
            {
                id: Date.now().toString(), body: body, sender: (
                    await this.getRequesterId()).toString(),
                receiver: interlocutorId,
                ack: "SENT",
                createdAt: new Date()
            }
            ]);
        } catch (err) {
            console.error("erreur lors de la mise à jour du chat", err);
            Alert.alert("Erreur d'envoi", "erreur lors de la mise à jour du chat." + err);
        }


        //logique d'envoi de message
        try {
            const res = await this.api.sendMessage({
                body,
                projectId: PROJECT_ID,
                receiverId: interlocutorId,
                senderId: (await this.getRequesterId()).toString(),
            });

            console.log("response send message ", res);

            if (res) {

                //recupere les conversations
                const chatDetails = await this.getChatDetails(receiverName);

                //si c'est non vide
                if (chatDetails) {
                    chatDetails.push(res);
                    await AsyncStorage.setItem(interlocutorId, JSON.stringify(chatDetails));
                    console.log("liste message local : ", await AsyncStorage.getItem(interlocutorId));
                } else {
                    //si c'est la premiere conversation
                    //recupere la liste des avec qui il a deja echangé

                    const onlineChats = this.getUserChat();
                    console.log("getUserChats Response: ", onlineChats)

                    //ajoute l'interloccuteur actuele
                    await AsyncStorage.setItem("userChats", JSON.stringify(onlineChats));
                    await AsyncStorage.setItem(interlocutorId, JSON.stringify([res]));
                    console.log("liste message online: ", await AsyncStorage.getItem(interlocutorId));
                }
            }

            return res;
        } catch (err) {
            console.log(err);
            Alert.alert("Erreur d'envoi", "Le message n'a pas pu être envoyé. Veuillez réessayer plus tard." + err);
            return null;
        }
    }

}