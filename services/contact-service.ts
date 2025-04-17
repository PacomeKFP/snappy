import AsyncStorage from "@react-native-async-storage/async-storage";
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { AddContactDto, User } from "@/lib/models";
import { Alert } from "react-native";

export class ContactService {

  public static async addContact(email: string, username: string, onClose: any) {
    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

    if (!validateEmail(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    try {
      // Connect to the server
      const snappy = new SnappyHTTPClient("http://88.198.150.195:8613");

      //get user's externalId

      Alert.alert(
        "Confirmation",
        `Voulez-vous ajouter ${email} ?`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "OK", onPress: () => {
              //recherche de l'utilisateur pour extraire son exrernalId
              snappy.filterUserByDisplayName({

                "displayName": username,
                "projectId": projectId

              }).then(async (otherUser) => {
                // Check if the user exists
                if (otherUser.length > 0) {
                  // add contacts
                  snappy.addContact({
                    "requesterId": await (async () => {
                      const value = await AsyncStorage.getItem("user");
                      if (value !== null) {
                        // We have data!!
                        return JSON.parse(value).externalId;
                      }
                      return snappy.getUser()!.externalId!;
                    })(), //get user's ID
                    "contactId": otherUser[0]!.id!,
                    "projectId": projectId
                  });

                  try {
                    // Récupérer les contacts existants
                    const jsonValue = await AsyncStorage.getItem("contacts");
                    const contacts = jsonValue != null ? JSON.parse(jsonValue) : [];
                
                    // Ajouter le nouvel utilisateur
                    contacts.push(otherUser[0]);
                
                    // Sauvegarder la liste mise à jour
                    await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
                
                    console.log("Utilisateur ajouté avec succès !");
                  } catch (error) {
                    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
                  }

                  onClose();
                } else {
                  alert("No contacts found.");
                }
              }).catch((error) => {
                alert("Failed to fetch contacts: " + error.message);
              });
              onClose()
            }
          }
        ]
      );


    } catch (error) {
      console.error("Error during authentication:", error);

    }
  }

  public static async getViewContact() {

    //essaie de vérifier les contacs en local
    const contacts = await AsyncStorage.getItem("contacts")

    if (contacts){
      return JSON.parse(contacts)
    }

    //Si non on cherche en ligne
    const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
    const projectId = "81997082-7e88-464a-9af1-b790fdd454f8"

  
    const onlineContact = await snappy.getUserContacts({
      "projectId": projectId,
      "userExternalId": await (async () => {
        const value = await AsyncStorage.getItem("user");
        if (value !== null) {
          // We have data!!
          return JSON.parse(value).externalId;
        }
        return snappy.getUser()!.externalId!;
      })()
    })

    //enregistre en local
    AsyncStorage.setItem("contacts",JSON.stringify(onlineContact))
    return onlineContact  
  }
}
