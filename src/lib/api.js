// lib/api.js
import axios from 'axios';

const BASE_URL = '/api';

// Créer une nouvelle instance de conversation
export const createChatInstance = async (accesskeys) => {
  try {
        
    const response = await axios.post(`http://localhost:8000/create`, { accesskeys });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'instance:', error);
    throw error;
  }
};

// Envoyer un message et obtenir une réponse
export const sendMessage = async (idInstanceChat, message) => {
  try {
        
    const response = await axios.post(`http://localhost:8000/infer`, { 
      idInstanceChat, 
      message 
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    throw error;
  }
};

// Récupérer l'historique d'une conversation
export const getHistory = async (idInstanceChat) => {
  try {
    
    const response = await axios.post(`http://localhost:8000/history`, { idInstanceChat :idInstanceChat });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    throw error;
  }
};


// Récupérer l'historique des messages d'une conversation
export const getConversationHistory = async (idInstanceChat) => {
  try {
    const response = await fetch(`http://localhost:8000/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idInstanceChat }),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de l\'historique');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    throw error;
  }
};