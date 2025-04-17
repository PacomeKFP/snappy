import AsyncStorage from "@react-native-async-storage/async-storage";
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { AddContactDto, User } from "@/lib/models";

export class ContactService {
  private static snappy = new SnappyHTTPClient("http://88.198.150.195:8613");
  private static projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

  /**
   * Ajoute un contact en faisant la requête API.
   * @param dto Les données nécessaires pour l'ajout de contact.
   */
  public static async addContactToServer(dto: AddContactDto): Promise<User[]> {
    try {
      const response = await this.snappy.addContact(dto); // Envoie la requête d'ajout de contact
      return response; // Retourne la liste des utilisateurs mis à jour
    } catch (error) {
      console.error("Erreur lors de l'ajout du contact :", error);
      throw new Error("Erreur lors de l'ajout du contact.");
    }
  }

  /**
   * Récupère la liste des contacts depuis le serveur.
   * @param userExternalId L'ID externe de l'utilisateur.
   */
  public static async getContactsFromServer(userExternalId: string): Promise<User[]> {
    try {
      const response = await this.snappy.getUserContacts({
        projectId: this.projectId,
        userExternalId,
      });
      return response; // Liste des contacts
    } catch (error) {
      console.error("Erreur lors de la récupération des contacts :", error);
      throw new Error("Erreur lors de la récupération des contacts.");
    }
  }

  /**
   * Récupère les contacts depuis AsyncStorage (cache local).
   */
  public static async getContactsFromStorage(): Promise<User[]> {
    try {
      const contacts = await AsyncStorage.getItem("contacts");
      return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
      console.error("Erreur lors de la récupération des contacts depuis AsyncStorage :", error);
      return [];
    }
  }

  /**
   * Sauvegarde les contacts dans AsyncStorage.
   * @param contacts Liste des contacts à sauvegarder.
   */
  public static async saveContactsToStorage(contacts: User[]): Promise<void> {
    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des contacts dans AsyncStorage :", error);
    }
  }
}
