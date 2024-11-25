import React from 'react';
import MessageInput from './MessageInput';
import { Contact } from '@/services/types';

interface ChatAreaProps {
  contact: Contact;
  onSendMessage: (text: string) => void;
  isDarkMode: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ contact, onSendMessage, isDarkMode }) => (
  <div className="flex-1 flex flex-col">
    <header className="p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <h2>{contact.name}</h2>
      <p>{contact.status}</p>
    </header>
    <div className="flex-1 p-4 overflow-y-auto">
      {contact.messages?.map((msg) => (
        <div key={msg.id} className={`mb-2 ${msg.sender === 'me' ? 'text-right' : ''}`}>
          <div className={`p-2 rounded ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
    <MessageInput onSendMessage={onSendMessage} />
  </div>
);

export default ChatArea;
