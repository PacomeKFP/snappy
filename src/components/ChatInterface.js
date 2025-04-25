import { useState, useEffect } from 'react';
import { createChatInstance, sendMessage, getHistory } from '@/lib/api';
import ChatMessages from './ChatMessages';
import InputMessage from './InputMessage';

export default function ChatInterface({ chatbot }) {
  const [idInstanceChat, setIdInstanceChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initChat() {
      if (!chatbot?.accesskeys) return;
      
      try {
        setLoading(true);
        // Créer une instance de chat
        const { idInstanceChat } = await createChatInstance(chatbot.accesskeys);
        setIdInstanceChat(idInstanceChat);
        
        // Récupérer l'historique des messages
        try {
          const history = await getConversationHistory(idInstanceChat);
          if (history && history.messages && history.messages.length > 0) {
            const formattedMessages = history.messages.flatMap(msg => [
              { content: msg.message, isUser: true },
              { content: msg.response, isUser: false }
            ]);
            setMessages(formattedMessages);
          } else {
            // Ajouter un message de bienvenue si pas d'historique
            setMessages([
              { 
                content: `Bonjour, je suis ${chatbot.label}. Comment puis-je vous aider aujourd'hui?`, 
                isUser: false 
              }
            ]);
          }
        } catch (historyError) {
          console.error("Erreur lors de la récupération de l'historique:", historyError);
          // Message de bienvenue par défaut en cas d'erreur
          setMessages([
            { 
              content: `Bonjour, je suis ${chatbot.label}. Comment puis-je vous aider aujourd'hui?`, 
              isUser: false 
            }
          ]);
        }
      } catch (err) {
        setError("Impossible d'initialiser le chat. Veuillez réessayer.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    initChat();
  }, [chatbot]);

  const handleSendMessage = async (content) => {
    if (!idInstanceChat) return;

    // Ajouter le message de l'utilisateur à la conversation
    setMessages(prev => [...prev, { content, isUser: true }]);
    
    try {
      setLoading(true);
      
      // Envoyer le message à l'API
      const { response } = await sendMessage(idInstanceChat, content);
      
      // Ajouter la réponse du chatbot
      setMessages(prev => [...prev, { content: response, isUser: false }]);
    } catch (err) {
      setError("Erreur lors de l'envoi du message.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!chatbot) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Sélectionnez un chatbot pour commencer</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm border-b">
        <h2 className="text-xl font-semibold text-gray-800">{chatbot.label}</h2>
        <p className="text-sm text-gray-500">{chatbot.description}</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 m-4 rounded">
          {error}
          <button 
            className="ml-2 underline"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      )}
      
      <ChatMessages messages={messages} />
      
      <InputMessage 
        onSendMessage={handleSendMessage} 
        disabled={loading || !idInstanceChat} 
      />
    </div>
  );
}