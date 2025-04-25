import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

export default function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          <p>Envoyez un message pour démarrer la conversation</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageItem 
            key={index} 
            message={msg.content} 
            isUser={msg.isUser} 
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}