"use client";

import { useState, useEffect } from "react";
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";

//Simulation des fonctions essentielles
async function authenticate() {
  return { token: "fake-token" };
}

async function getValidRequesterId() {
  return "fake-requester-id";
}

//implementation du localStorage
const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`Données sauvegardées dans ${key}:`, data);
        return true;
        } catch (error) {
        console.error("Erreur lors de la sauvegarde dans le localStorage:", error);
        return false;
    }
};

const getFromLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        console.log(`Données récupérées de ${key}:`, item);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Erreur lors de la récupération du localStorage:", error);
        return null;
    }
}

export default function AddContactPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [requesterId, setRequesterId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const PROJECT_ID = "81997082-7e88-464a-9af1-b790fdd454f8";
  const API_URL = 'http://88.198.150.195:8613';

  // Récupérer les contacts depuis le localStorage au chargement
  useEffect(() => {
      const savedContacts = getFromLocalStorage("contacts");
      if (savedContacts) {
          setContacts(savedContacts);
      }
  }, []);

  // Initialisation au chargement
  useEffect(() => {
    const initializeRequesterId = async () => {
      try {
        const authResponse = await authenticate();
        if (authResponse) {
          const validId = await getValidRequesterId();
          if (validId) {
            setRequesterId(validId);
          }
        }
      } catch (error) {
        setError("Erreur d'initialisation");
      }
    };
    initializeRequesterId();
  }, []);

  // Filtrer les contacts selon le terme de recherche
  const filteredContacts = contacts.filter(contact =>
    contact.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddContact = async () => {
    if (!username.trim()) {
      setMessage("Le nom d'utilisateur est requis");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    let contactData = null;

    try{
        const snappy = new SnappyHTTPClient(API_URL);

        // Rechercher l'externalId de l'interlocuteur
        const contactId = await snappy.filterUserByDisplayName({
            displayName: username,
            projectId: PROJECT_ID
        });

        if (!contactId || contactId.length === 0) {
            setMessage("Aucun utilisateur trouvé avec ce nom");
            setLoading(false);
            return;
        }

        // Asignation du contactId
        contactData = contactId[0];

        console.log("💾 Données du contact sauvegardées:", contactData);
        console.log("contactId", contactData.externalId);
        console.log("DONNEES DE SNAPPY",requesterId,contactId,PROJECT_ID);

        // Ajouter un contact
        const updatedContacts = await snappy.addContact({
            requesterId : "ff04a592-73a8-4e89-b850-d6d966718722",
            contactId : contactId[0].externalId,
            projectId : PROJECT_ID
        });

        console.log("contacts : ",updatedContacts)
        if(updatedContacts) {
          const newContact = {
              id: Date.now(),
              username: contactData.displayName,
              displayName: contactData.displayName,
              email: contactData.email || "Non renseigné",
              addedAt: new Date().toLocaleDateString("fr-FR"),
              externalId: contactData.externalId,
              status: "Ajouté avec succès",
              serverData: {
                login: contactData.login,
                avatar: contactData.avatar,
                online: contactData.online,
                organization: contactData.organization?.name || "Non renseignée"
              }
            };
       console.log("Nouveau contact créé:", newContact);
        //mise à jour des contacts
        const updatedContact = [...contacts, newContact];
        setContacts(updatedContact);
        // Sauvegarder les contacts dans le localStorage
        saveToLocalStorage('contacts' , updatedContact);
            setMessage("Contact ajouté avec succès");
            setUsername("");
            setEmail("");
        }
    } catch (error) {
          console.log("🔥 Erreur API détectée:", error.response?.data);

          // Si l'utilisateur est déjà un contact côté serveur, on l'ajoute quand même localement
          if (error.response?.data?.error === 'User is already a contact') {
            console.log("📝 Contact déjà existant côté serveur, ajout local...");

            const newContact = {
              id: Date.now(),
              username: contactData.displayName,
              displayName: contactData.displayName,
              email: contactData.email || "Non renseigné",
              addedAt: new Date().toLocaleDateString("fr-FR"),
              externalId: contactData.externalId,
              status: "Déjà contact (ajouté localement)",
              serverData: {
                login: contactData.login,
                avatar: contactData.avatar,
                online: contactData.online,
                organization: contactData.organization?.name || "Non renseignée"
              }
            };

            // Vérifier si déjà présent localement
        const existsLocally = contacts.some(contact => contact.externalId === contactData.externalId);
        if (!existsLocally) {
              const updatedContact = [...contacts, newContact];
              setContacts(updatedContact);
              saveToLocalStorage('contacts', updatedContact);
              console.log("✅ Contact ajouté localement:", newContact);
              setMessage("Contact ajouté localement (déjà contact côté serveur)");
            } else {
              setMessage("Ce contact existe déjà dans votre liste locale");
            }

            setUsername("");
            setEmail("");
          } else {
            // Autres erreurs
            if (error.response) {
              console.error("Réponse serveur :", error.response.data);
              setMessage("Erreur serveur: " + JSON.stringify(error.response.data));
            } else {
              console.error("Erreur lors de l'ajout de contact :", error);
              setMessage("Erreur lors de l'ajout du contact.");
            }
          }
        } finally {
          setLoading(false);
        }
  };

  const removeContact = (id) => {
      //Mise à jour du State
   const filteredContactsToRemove = contacts.filter(contact => contact.id !== id);
    setContacts(filteredContactsToRemove);

    //Mise à jour du localStorage
    saveToLocalStorage('contacts' , filteredContactsToRemove);

    setMessage("Contact supprimé");
    setTimeout(() => setMessage(""), 3000);
  };

  const ContactCard = ({ contact }) => (
    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-xl shadow-md">
            {contact.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-lg text-gray-800 truncate">
              {contact.displayName || contact.username}
            </h3>
            {contact.email && contact.email !== "Non renseigné" && (
              <p className="text-sm text-gray-600 truncate">{contact.email}</p>
            )}
            <div className="flex items-center mt-2 gap-3">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Ajouté le {contact.addedAt}
              </span>
              {contact.serverData?.online !== undefined && (
                <span className="text-xs px-2 py-1 rounded-full flex items-center bg-white border">
                  <span className={`w-2 h-2 rounded-full mr-1 ${contact.serverData.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  {contact.serverData.online ? 'En ligne' : 'Hors ligne'}
                </span>
              )}
              {contact.serverData?.organization && contact.serverData.organization !== "Non renseignée" && (
                <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
                  {contact.serverData.organization}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => removeContact(contact.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 ml-2"
          title="Supprimer le contact"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center">
          Gestion des Contacts
        </h1>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-lg shadow-lg border-2 border-purple-200 p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            Ajouter un nouveau contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-2 border-purple-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                placeholder="Entrez le nom d'utilisateur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-purple-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                placeholder="exemple@email.com (optionnel)"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleAddContact}
              disabled={loading}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Ajout en cours..." : "Ajouter le contact"}
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
              message.includes("succès") || message.includes("supprimé") || message.includes("localement")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Section des contacts */}
        <div className="bg-white rounded-lg shadow-lg border-2 border-purple-200">
          {/* En-tête avec recherche et options */}
          <div className="p-6 border-b border-purple-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold text-purple-700">
                Contacts ajoutés ({filteredContacts.length}/{contacts.length})
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Barre de recherche */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Boutons de vue */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    Grille
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    Liste
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu des contacts */}
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-purple-50 m-6 rounded-lg">
              <div className="text-4xl mb-4">
                {searchTerm ? "🔍" : "👥"}
              </div>
              <p className="text-lg font-medium mb-2">
                {searchTerm ? "Aucun contact trouvé" : "Aucun contact ajouté"}
              </p>
              <p className="text-sm">
                {searchTerm
                  ? "Essayez avec un autre terme de recherche"
                  : "Utilisez le formulaire ci-dessus pour ajouter votre premier contact"
                }
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div
                className={`
                  max-h-96 overflow-y-auto overscroll-contain
                  ${viewMode === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
                    : "space-y-3"
                  }
                `}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#a855f7 #f3f4f6'
                }}
              >
                {filteredContacts.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>

              {/* Indicateur de défilement */}
              {filteredContacts.length > 4 && (
                <div className="text-center mt-4 text-sm text-gray-500">
                  Faites défiler pour voir plus de contacts
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }
      `}</style>
    </div>
  );
}