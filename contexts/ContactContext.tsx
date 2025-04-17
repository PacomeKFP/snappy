// ContactContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { AddContactDto, User } from '@/lib/models';

interface ContactContextType {
  contacts: User[];
  addContact: (email: string, username: string) => Promise<boolean>;
  fetchContacts: () => Promise<void>;
}

const ContactContext = createContext<ContactContextType | null>(null);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<User[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const saved = await AsyncStorage.getItem("contacts");
      if (saved) {
        setContacts(JSON.parse(saved));
      } else {
        const snappy = new SnappyHTTPClient("http://88.198.150.195:8613");
        const projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

        const userData = await AsyncStorage.getItem("user");
        const requesterId = userData ? JSON.parse(userData).externalId : snappy.getUser()?.externalId;

        if (!requesterId) {
          console.error("Erreur: requesterId introuvable pour fetchContacts.");
          return;
        }

        const serverContacts = await snappy.getUserContacts({ projectId, userExternalId: requesterId });
        setContacts(serverContacts);
        await AsyncStorage.setItem("contacts", JSON.stringify(serverContacts));
      }
    } catch (e) {
      console.error("Erreur fetch contacts:", e);
    }
  };

  const addContact = async (email: string, username: string): Promise<boolean> => {
    try {
      const snappy = new SnappyHTTPClient("http://88.198.150.195:8613");
      const projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

      const otherUser = await snappy.filterUserByDisplayName({ displayName: username, projectId });

      if (!otherUser.length || !otherUser[0]?.id) {
        alert("Aucun utilisateur trouvé avec ce nom !");
        console.log("Recherche utilisateur échouée pour:", username);
        return false;
      }

      const userData = await AsyncStorage.getItem("user");
      const requesterId = userData ? JSON.parse(userData).externalId : snappy.getUser()?.externalId;

      if (!requesterId) {
        alert("Utilisateur local introuvable, veuillez vous reconnecter !");
        console.error("Erreur: requesterId null ou vide.");
        return false;
      }

      const dto: AddContactDto = { requesterId, contactId: otherUser[0].id, projectId };

      // Log clair pour déboguer si jamais ça échoue côté serveur
      console.log("Données envoyées au serveur pour addContact:", dto);

      const updatedContacts = await snappy.addContact(dto);

      setContacts(updatedContacts);
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));

      return true;

    } catch (error) {
      console.error("Erreur lors de l'ajout de contact :", error);
      alert("Erreur lors de l'ajout du contact, veuillez réessayer.");
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
