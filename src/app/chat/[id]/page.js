// app/chat/[id]/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { HiChevronLeft, HiPaperAirplane, HiOutlineDocumentText, HiDotsVertical, HiArrowCircleUp } from 'react-icons/hi';
import { sendMessage, getHistory } from '../../../lib/api';

export default function ChatPage({ params }) {
  const { id: idInstanceChat } = params;
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [instanceInfo, setInstanceInfo] = useState(null);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  // Charger l'historique des messages
  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        const data = await getHistory(idInstanceChat);
        
        // Convertir les messages au format attendu
        const formattedMessages = data.messages.map(msg => ({
          id: msg.id,
          content: msg.message,
          response: msg.response,
          isUser: true,
          timestamp: msg.timestamp
        }));
        
        setMessages(formattedMessages.flatMap(msg => [
          { id: `${msg.id}-question`, content: msg.content, isUser: true, timestamp: msg.timestamp },
          { id: `${msg.id}-answer`, content: msg.response, isUser: false, timestamp: msg.timestamp }
        ]));
        
        setInstanceInfo({
          accesskeys: data.accesskeys,
          idInstanceChat: data.idInstanceChat
        });
        
      } catch (err) {
        setError("Impossible de charger l'historique des messages");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadHistory();
  }, [idInstanceChat]);
  
  // Détecter le défilement pour afficher le bouton "remonter"
  useEffect(() => {
    const handleScroll = () => {
      if (messagesContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
        setShowScrollButton(scrollTop < scrollHeight - clientHeight - 100);
      }
    };
    
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Défiler automatiquement vers le bas quand de nouveaux messages sont ajoutés
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || sending) return;
    
    const messageText = newMessage;
    setNewMessage('');
    
    // Ajouter le message de l'utilisateur immédiatement
    setMessages(prev => [...prev, {
      id: `temp-${Date.now()}`,
      content: messageText,
      isUser: true,
      timestamp: new Date().toISOString()
    }]);
    
    try {
      setSending(true);
      
      // Envoyer le message à l'API
      const response = await sendMessage(idInstanceChat, messageText);
      
      // Ajouter la réponse du chatbot
      setMessages(prev => [...prev, {
        id: `response-${Date.now()}`,
        content: response.response,
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
      
    } catch (err) {
      setError("Erreur lors de l'envoi du message");
      console.error(err);
    } finally {
      setSending(false);
    }
  };
  
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleBackToInstances = () => {
    if (instanceInfo?.accesskeys) {
      router.push(`/instances/${instanceInfo.accesskeys}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBackToInstances}
              className="inline-flex items-center text-gray-700 hover:text-gray-900"
            >
              <HiChevronLeft className="h-5 w-5 mr-1" />
              Retour aux conversations
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 p-1">
                <HiOutlineDocumentText className="h-6 w-6" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 p-1">
                <HiDotsVertical className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main chat area */}
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 max-w-lg">
              <p>{error}</p>
              <button 
                className="mt-2 text-red-700 underline"
                onClick={() => window.location.reload()}
              >
                Réessayer
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6"
            >
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <p>Envoyez un message pour démarrer la conversation</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div
                      key={message.id || index}
                      className={`mb-4 ${message.isUser ? 'flex justify-end' : 'flex justify-start'}`}
                    >
                      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.isUser 
                          ? 'bg-blue-500text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className={`text-xs mt-1 text-right ${
                          message.isUser ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Indicateur de chargement pour la réponse */}
                  {sending && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
            
            {/* Message input */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                <div className="flex-1 min-h-[60px]">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message ici..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[60px] max-h-[150px]"
                    rows={1}
                    disabled={sending}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className={`p-3 rounded-full ${
                    !newMessage.trim() || sending
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-500text-white hover:bg-blue-600'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                >
                  <HiPaperAirplane className="h-6 w-6 transform rotate-90" />
                </button>
              </form>
            </div>
          </div>
        )}
        
        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-24 right-8 p-3 rounded-full bg-white shadow-lg text-blue-500 hover:bg-gray-50 transition-colors"
          >
            <HiArrowCircleUp className="h-6 w-6" />
          </button>
        )}
      </main>
    </div>
  );
}