import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { AddContactDto, User } from '@/lib/models';
import { API_URL, PROJECT_ID } from '@/lib/constants'; 

interface ContactContextType {
  contacts: User[];
  addContact: (email: string, username: string) => Promise<boolean>;
  fetchContacts: () => Promise<{ success: boolean; error?: string }>;
}

const ContactContext = createContext<ContactContextType | null>(null);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<User[]>([]);

  // Nouvelle version : retour d'un statut (success / erreur)
  const fetchContacts = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      //recupère les contacts dans le local storage
      const saved = await AsyncStorage.getItem("contacts");
      //si on a des contacts, on les met dans le state et on sort
      if (saved) {
        const localContacts = JSON.parse(saved);
        setContacts(localContacts);
        return { success: true };
      }

      const snappy = new SnappyHTTPClient(API_URL);
      const userData = await AsyncStorage.getItem("user");
      const requesterId = userData ? JSON.parse(userData).externalId : snappy.getUser()?.externalId;

      if (!requesterId) {
        console.error("Erreur: requesterId introuvable pour fetchContacts.");
        return { success: false, error: "Identifiant utilisateur introuvable." };
      }

      const serverContacts = await snappy.getUserContacts({
        projectId: PROJECT_ID,
        userExternalId: requesterId
      });

      // Suppression des doublons
      const uniqueContacts = serverContacts.filter((contact, index, self) =>
        index === self.findIndex(c => c.externalId === contact.externalId)
      );

      await AsyncStorage.setItem("contacts", JSON.stringify(uniqueContacts));
      setContacts(uniqueContacts);

      return { success: true };
    } catch (e: any) {
      console.error("Erreur fetch contacts:", e);
      return { success: false, error: e.message };
    }
  };

  const addContact = async (email: string, username: string): Promise<boolean> => {
    try {
      const snappy = new SnappyHTTPClient(API_URL);
      //RECHERCHE DE L'UTILISATEUR À PARTIR DE SON NOM

      const otherUser = await snappy.filterUserByDisplayName({
        displayName: username,
        projectId: PROJECT_ID
      });

      if (!otherUser.length || !otherUser[0]?.id) {
        alert("Aucun utilisateur trouvé avec ce nom !");
        console.log("Recherche utilisateur échouée pour:", username);
        return false;
      }

      const userData = await AsyncStorage.getItem("user");
      
      const requesterId = userData ? JSON.parse(userData).externalId : snappy.getUser()!.externalId!;

      if (!requesterId) {
        alert("Utilisateur local introuvable, veuillez vous reconnecter !");
        console.error("Erreur: requesterId null ou vide.");
        return false;
      }

      const dto: AddContactDto = { 
        requesterId, 
        contactId: otherUser[0]!.externalId!,
         projectId: PROJECT_ID 
        };

      console.log("Données envoyées au serveur pour addContact:", dto);

      //recuperes la liste mis à jour des contacts
      const updatedContacts = await snappy.addContact(dto);

      // Stockage d'abord pour éviter les décalages en cas d'échec
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
      setContacts(updatedContacts);

      return true;

    } catch (error: any) {
      if (error.response) {
        console.error("Réponse serveur :", error.response.data);
        alert("Erreur: " + JSON.stringify(error.response.data));
      } else {
        console.error("Erreur lors de l'ajout de contact :", error);
        alert("Erreur lors de l'ajout du contact.");
      }
      return false;
    }
    
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, fetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContacts doit être utilisé dans ContactProvider");
  return context;
};
