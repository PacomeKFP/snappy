import AsyncStorage from "@react-native-async-storage/async-storage";
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { AddContactDto, User } from "@/lib/models";
import { Alert } from "react-native";
import { API_URL, PROJECT_ID } from '@/lib/constants'; 

export class ContactService {

  private static api = new SnappyHTTPClient(API_URL);

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
              //recherche l'utilisateur à partir de son nom
              const otherUser = await this.api.filterUserByDisplayName({
                displayName: username,
                projectId: PROJECT_ID
              });
              //si on a pas trouvé d'utilisateur, on sort
              if (otherUser.length === 0) {
                alert("Aucun contact trouvé.");
                return;
              }
              //si on a trouvé , on recupère le premier utilisateur
              const contactToAdd = otherUser[0];

              //preparation deu DTo
              const dto: AddContactDto = {
                requesterId : await this.getRequesterId(),
                contactId: contactToAdd!.externalId!,
                projectId: PROJECT_ID
              };

              //on envoie une requette pour ajouter le contact
              await this.api.addContact(dto);  // bien attendre que le serveur confirme

              //on enregistre le contact dans le local storage
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
    //Récupère l'ID de l'utilisateur demandeur à partir du stockage local ou de l'API.
    const localUser = await AsyncStorage.getItem("user");
    if (localUser) {
      return JSON.parse(localUser).externalId;
    }
    return this.api.getUser()!.externalId!;
  }

  private static async saveContactLocally(contact: User): Promise<void> {
    //recupere les anciens contacts
    const jsonValue = await AsyncStorage.getItem("contacts");
    //on initialise contacts à une liste vide de Json , si aucun contact trouvé
    const contacts = jsonValue ? JSON.parse(jsonValue) : [];
    //on ajoute le contact à la liste
    contacts.push(contact);
    //on ajoute le contact dans le localStorage
    await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
  }

  public static async getViewContact(): Promise<User[]> {
    //Methode pour recuperer les contacts
    //on verifie si on a deja des contacts dans le local storage
    const local = await AsyncStorage.getItem("contacts");
    if (local) return JSON.parse(local);

    const requesterId = await this.getRequesterId();
    //si on n'a pas de contacts, on les recupere depuis le serveur
    const onlineContacts = await this.api.getUserContacts({
      projectId: PROJECT_ID,
      userExternalId: requesterId
    });

    await AsyncStorage.setItem("contacts", JSON.stringify(onlineContacts));
    return onlineContacts;
  }
}
