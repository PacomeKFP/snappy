/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react';
import { 
  FaUser, FaSearch, FaPlusCircle, FaEllipsisV, FaCircle, 
  FaBell, FaMoon, FaSun, FaLock, FaImage
} from 'react-icons/fa';
import Link from 'next/link';
import bg_login from '@/assets/bg_login.jpg';

interface Contact {
  id: number;
  name: string;
  status: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isTyping?: boolean;
}

const ChatInitiate: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [contacts] = useState<Contact[]>([
    { 
      id: 1, 
      name: 'Hello 1', 
      status: 'online',
      lastMessage: "Hey, how are you doing?",
      time: "09:34",
      unread: 2,
      isTyping: true
    },
    { 
      id: 2, 
      name: 'Hello 2', 
      status: 'offline',
      lastMessage: "See you tomorrow!",
      time: "Yesterday",
    },
    { 
      id: 3, 
      name: 'Hello 3', 
      status: 'online',
      lastMessage: "Meeting at 3 PM",
      time: "08:15",
      unread: 5
    },
  ]);

  // Définition des couleurs basées sur le thème
  const theme = {
    bg: isDarkMode ? '#171717' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#171717',
    primary: '#247EE4',
    secondary: isDarkMode ? '#322F44' : '#D9D9D9',
    hover: isDarkMode ? '#2a2a2a' : '#f5f5f5',
    border: isDarkMode ? '#333333' : '#D9D9D9',
  };

  return (
    <div className={`flex h-screen transition-colors duration-300 ease-in-out`}
         style={{ background: theme.bg }}>
      {/* Left Sidebar */}
      <div className="w-[400px] flex flex-col border-r transition-all duration-300"
           style={{ borderColor: theme.border }}>
        {/* Header with gradient */}
        <div className="h-16 relative overflow-hidden">
          <div className="absolute inset-0" 
               style={{
                 background: 'linear-gradient(135deg, #247EE4, #0069E0, #322F44)',
                 opacity: isDarkMode ? 0.8 : 1
               }}
          />
          <div className="relative h-full flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <FaUser className="w-10 h-10 rounded-full bg-white/90 p-2 text-[#247EE4]" />
              <span className="text-white font-semibold">Mon profil</span>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <FaBell className="w-6 h-6 cursor-pointer hover:text-white/80 transition-colors" />
              <div onClick={() => setIsDarkMode(!isDarkMode)} className="cursor-pointer">
                {isDarkMode ? (
                  <FaSun className="w-6 h-6 hover:text-white/80 transition-colors" />
                ) : (
                  <FaMoon className="w-6 h-6 hover:text-white/80 transition-colors" />
                )}
              </div>
              <FaEllipsisV className="w-6 h-6 cursor-pointer hover:text-white/80 transition-colors" />
            </div>
          </div>
        </div>

        {/* Search Bar with animation */}
        <div className="px-4 py-3" style={{ background: theme.bg }}>
          <div className="relative group bg-[#ffffff]">
            <input
              type="text"
              placeholder="Search a new discussion..."
              className="w-full bg-[#ffffff] py-2.5 pl-10 pr-4 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-[#247EE4]"
              style={{
                background: theme.secondary,
                color: theme.text,
                border: 'none',
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute  left-3 top-3 text-[#322F44] group-focus-within:text-[#247EE4] transition-colors" />
          </div>
        </div>

        {/* Contacts List with hover and selection effects */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <Link href={`/chat/chat-discussion/${contact.id}`} key={contact.id}>
              <div
                className={`flex items-center p-4 cursor-pointer transition-all duration-300 relative ${
                  selectedContact === contact.id ? 'scale-[0.98]' : ''
                }`}
                style={{
                  background: selectedContact === contact.id ? theme.hover : theme.bg,
                  borderBottom: `1px solid ${theme.border}`,
                }}
                onClick={() => setSelectedContact(contact.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <FaUser className="w-full h-full p-2" style={{ 
                      background: theme.secondary,
                      color: theme.primary 
                    }} />
                  </div>
                  {contact.status === 'online' && (
                    <FaCircle className="absolute bottom-0 right-0 text-[#14F400] text-xs" />
                  )}
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold transition-colors"
                        style={{ color: theme.text }}>
                      {contact.name}
                    </h3>
                    <span className="text-xs" style={{ color: theme.secondary }}>
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    {contact.isTyping ? (
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-[#247EE4]">typing</span>
                       
                      </div>
                    ) : (
                      <p className="text-sm truncate" style={{ color: theme.secondary }}>
                        {contact.lastMessage}
                      </p>
                    )}
                    {contact.unread && (
                      <span className="bg-[#247EE4] text-white rounded-full px-2 py-1 text-xs animate-pulse">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content with Welcome Screen */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="h-16 px-4 flex items-center justify-between"
                 style={{ 
                   background: 'linear-gradient(135deg, #247EE4, #0069E0, #322F44)',
                   opacity: isDarkMode ? 0.8 : 1
                 }}>
              <div className="flex items-center gap-4">
                <FaUser className="w-10 h-10 rounded-full bg-white/90 p-2 text-[#247EE4]" />
                <div>
                  <h3 className="text-white font-semibold">
                    {contacts.find(c => c.id === selectedContact)?.name}
                  </h3>
                  <span className="text-xs text-white/80">online</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <FaSearch className="w-5 h-5 cursor-pointer hover:text-white/80" />
                <FaImage className="w-5 h-5 cursor-pointer hover:text-white/80" />
                <FaEllipsisV className="w-5 h-5 cursor-pointer hover:text-white/80" />
              </div>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 p-6" style={{ 
              background: isDarkMode ? '#1a1a1a' : '#f0f2f5',
              backgroundImage: `url(${bg_login.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isDarkMode ? 0.9 : 1
            }}>
              {/* Messages would go here */}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8"
                
                style={{
                  backgroundImage: `url(${bg_login.src})`,  
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: isDarkMode ? 0.9 : 1
                }}
              >
            <div className="text-center max-w-md backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-lg">
              <div className="mb-6 text-center">
                <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#247EE4] to-[#0069E0] text-transparent bg-clip-text">
                  Snappy
                </h1>
                <div className="flex items-center justify-center gap-2 text-[#247EE4]">
                  <FaLock className="w-4 h-4" />
                  <span className="text-sm">Chiffrement de bout en bout</span>
                </div>
              </div>
              <p className="text-[#171717] mb-8 leading-relaxed" style={{ color: theme.text }}>
              welcome to Snappy connect with friends and colleagues either for friendly conversations or for Business Group meetings
              </p>
              <button className="bg-[#247EE4] text-white px-8 py-3 rounded-xl hover:bg-[#0069E0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Start a discussion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInitiate;