import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatResource, GetChatDetailsDto, Message, MessageAckEnum } from "@/lib/models";
import { Alert } from "react-native";
import { API_URL, PROJECT_ID } from '@/lib/constants';

export class ChatService {
    private static api = new SnappyHTTPClient(API_URL);


    public static async getRequesterId(): Promise<string> {
        const userId = await (async () => {
            const user = await AsyncStorage.getItem("user");
            return user ? JSON.parse(user).externalId : this.api.getUser()!.externalId!;
        })();

        return userId;
    }

    public static async getUserChat(): Promise<ChatResource[]> {


        try {
            const requesterId = await this.getRequesterId();
            console.log("Données envoyées au serveur :", requesterId, PROJECT_ID);

            const onlineChats = await this.api.getUserChats(requesterId, PROJECT_ID);

            console.log("Response serveur UserChats:", onlineChats);

            if (!onlineChats) {
                console.warn("Aucune donnée reçue du serveur.");
                return [];
            }

            await AsyncStorage.setItem("userChats", JSON.stringify(onlineChats));
            return onlineChats;

        } catch (error) {
            //essaie de recuperr les info en local
            const chats = await AsyncStorage.getItem("userChats");
            console.log("response userChat : ", chats);

            if (chats) return JSON.parse(chats);
            return [];
        }
    }



    public static async getChatDetails(name: string): Promise<Message[]> {

        //recherche l'Id de l'utilisateur à partir de son nom
        const users = await this.api.filterUserByDisplayName({ "displayName": name, "projectId": PROJECT_ID });
        const interlocutorId = users[0]!.externalId!;

        // verifier s'il y a déja la conversation en question dans le AsyncStorage
        const chatDetails = await AsyncStorage.getItem(interlocutorId);

        // si oui, alors, on sort en retournant le contenu du l'AsycnStorage
        if (chatDetails){
            //NE RENVOYER QUE LES CONERSATIONS CONCERNANT L'UTILSATEUR CONNECTÉ
            return JSON.parse(chatDetails).filter(async (message: Message) => message.sender === await this.getRequesterId());
        }

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
            console.log("Response serveur getChatDetails:", onlineChatDetails);
            AsyncStorage.setItem(interlocutorId, JSON.stringify(onlineChatDetails.messages))
            return onlineChatDetails!.messages!;
        } catch (error) {
            console.error("Response serveur ::", error);
            return [];
        }

    }
    public static async receiveMessage(senderName: string, message: Message, messages: any, setMessages: any) {
        console.log("message reçu", message);
        
        const newMessage = {
            id: message.id,
            body: message.body,
            sender: message.sender,
            receiver: message.receiver,
            ack: MessageAckEnum.RECEIVED,
            createdAt: new Date()
        };
    
        try {
            // Récupérer les conversations existantes
            const chatDetails = await this.getChatDetails(senderName);
    
            // Ajouter le nouveau message à la conversation
            if (chatDetails) {
                chatDetails.push(newMessage);
                // Sauvegarder la liste des messages mise à jour dans AsyncStorage
                await AsyncStorage.setItem(message!.sender!, JSON.stringify(chatDetails));
                console.log("liste message local : ", await AsyncStorage.getItem(message!.sender!));
            } else {
                // Si c'est la première conversation avec cet utilisateur
                const requesterId = await this.getRequesterId();
                const onlineChats = await this.api.getUserChats(requesterId, PROJECT_ID);
    
                // Sauvegarder les conversations en ligne
                await AsyncStorage.setItem("userChats", JSON.stringify(onlineChats));
                await AsyncStorage.setItem(message!.sender!, JSON.stringify([newMessage]));
                console.log("liste message online: ", await AsyncStorage.getItem(message!.sender!));
            }
    
            // Mettre à jour l'état avec les nouveaux messages
            const updatedChatDetails = await this.getChatDetails(senderName); // récupérer les détails après mise à jour
            setMessages(updatedChatDetails);
    
        } catch (err) {
            console.error("Erreur lors de la mise à jour du chat", err);
            Alert.alert("Erreur d'envoi", "Erreur lors de la mise à jour du chat." + err);
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
                id: Date.now().toString(),
                body: body,
                sender: (await this.getRequesterId()).toString(),
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
                    const requesterId = await this.getRequesterId();
                    const onlineChats = await this.api.getUserChats(requesterId, PROJECT_ID);
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
