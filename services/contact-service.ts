import AsyncStorage from "@react-native-async-storage/async-storage";
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { AddContactDto, User } from "@/lib/models";
import { Alert } from "react-native";

export class ContactService {

  private static projectId = "81997082-7e88-464a-9af1-b790fdd454f8";
  private static api = new SnappyHTTPClient("http://88.198.150.195:8613");

  public static async addContact(email: string, username: string, onClose: () => void) {
    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    if (!validateEmail(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    Alert.alert(
      "Confirmation",
      `Voulez-vous ajouter ${email} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              const otherUser = await this.api.filterUserByDisplayName({
                displayName: username,
                projectId: this.projectId
              });

              if (otherUser.length === 0) {
                alert("Aucun contact trouvé.");
                return;
              }

              const contactToAdd = otherUser[0];

              const requesterId = await this.getRequesterId();

              const dto: AddContactDto = {
                requesterId,
                contactId: contactToAdd.id!,
                projectId: this.projectId
              };

              await this.api.addContact(dto);  // bien attendre que le serveur confirme

              await this.saveContactLocally(contactToAdd);
              if (!dto.requesterId || !dto.contactId || !dto.projectId) {
                console.error("Données DTO incomplètes :", dto);
                alert("Impossible d'ajouter ce contact — données invalides !");
                return false;
              }
              
              console.log("Utilisateur ajouté avec succès !");
              onClose();

            } catch (error) {
              console.error("Erreur lors de l'ajout de contact :", error);
              //alert("Erreur lors de l'ajout : " + error.message);
            }
          }
        }
      ]
    );
    
  }

  private static async getRequesterId(): Promise<string> {
    const localUser = await AsyncStorage.getItem("user");
    if (localUser) {
      return JSON.parse(localUser).externalId;
    }
    return this.api.getUser()!.externalId!;
  }

  private static async saveContactLocally(contact: User): Promise<void> {
    const jsonValue = await AsyncStorage.getItem("contacts");
    const contacts = jsonValue ? JSON.parse(jsonValue) : [];
    contacts.push(contact);
    await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
  }

  public static async getViewContact(): Promise<User[]> {
    const local = await AsyncStorage.getItem("contacts");
    if (local) return JSON.parse(local);

    const requesterId = await this.getRequesterId();
    const onlineContacts = await this.api.getUserContacts({
      projectId: this.projectId,
      userExternalId: requesterId
    });

    await AsyncStorage.setItem("contacts", JSON.stringify(onlineContacts));
    return onlineContacts;
  }
}
