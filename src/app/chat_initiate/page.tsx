/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react';
import { 
  FaUser, FaSearch, FaPlusCircle, FaEllipsisV, FaCircle, 
  FaBell, FaMoon, FaSun, FaLock, FaImage, FaUserPlus, FaUsers, FaCog
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
  messages?: Message[];
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const Chat_initiate: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const [contacts, setContacts] = useState<Contact[]>([
    { 
      id: 1, 
      name: 'Hello 1', 
      status: 'online',
      lastMessage: "Hey, how are you doing?",
      time: "09:34",
      unread: 2,
      isTyping: true,
      messages: [
        { id: 1, text: "Hey, how are you doing?", sender: 'other', time: "09:34" },
        { id: 2, text: "I'm good, thanks! How about you?", sender: 'me', time: "09:35" }
      ]
    },
    { 
      id: 2, 
      name: 'Hello 2', 
      status: 'offline',
      lastMessage: "See you tomorrow!",
      time: "Yesterday",
      messages: [
        { id: 1, text: "See you tomorrow!", sender: 'other', time: "Yesterday" }
      ]
    },
    { 
      id: 3, 
      name: 'Hello 3', 
      status: 'online',
      lastMessage: "Meeting at 3 PM",
      time: "08:15",
      unread: 5,
      messages: [
        { id: 1, text: "Meeting at 3 PM", sender: 'other', time: "08:15" }
      ]
    },
  ]);

  const theme = {
    bg: isDarkMode ? '#171717' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#171717',
    primary: '#247EE4',
    secondary: isDarkMode ? '#322F44' : '#D9D9D9',
    hover: isDarkMode ? '#2a2a2a' : '#f5f5f5',
    border: isDarkMode ? '#333333' : '#D9D9D9',
  };

  const handleMoreOptionsToggle = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const currentContact = contacts.find(c => c.id === selectedContact);
    if (currentContact) {
      const newMessageObj: Message = {
        id: (currentContact.messages?.length || 0) + 1,
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedContacts = contacts.map(contact => {
        if (contact.id === selectedContact) {
          return {
            ...contact,
            lastMessage: newMessage,
            messages: [...(contact.messages || []), newMessageObj]
          };
        }
        return contact;
      });

      setContacts(updatedContacts);
      setNewMessage('');
    }
  };

  const renderMoreOptionsMenu = () => {
    if (!showMoreOptions) return null;

    return (
      <div 
        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
        style={{ 
          background: theme.bg, 
          color: theme.text, 
          border: `1px solid ${theme.border}` 
        }}
      >
        <div 
          className="flex items-center p-3 hover:bg-gray-100 cursor-pointer group transition-colors"
          style={{ 
            backgroundColor: theme.hover 
          }}
        >
          <FaPlusCircle className="mr-3 text-[#247EE4] group-hover:scale-110 transition-transform" />
          <div>
            <span className="font-semibold">Add a discussion</span>
            <p className="text-xs text-gray-500">Start a new conversation</p>
          </div>
        </div>
        <div 
          className="flex items-center p-3 hover:bg-gray-100 cursor-pointer group transition-colors"
          style={{ 
            backgroundColor: theme.hover 
          }}
        >
          <FaUsers className="mr-3 text-[#247EE4] group-hover:scale-110 transition-transform" />
          <div>
            <span className="font-semibold">Create a group</span>
            <p className="text-xs text-gray-500">Invite multiple people</p>
          </div>
        </div>
        <div 
          className="flex items-center p-3 hover:bg-gray-100 cursor-pointer group transition-colors"
          style={{ 
            backgroundColor: theme.hover 
          }}
        >
          <FaCog className="mr-3 text-[#247EE4] group-hover:scale-110 transition-transform" />
          <div>
            <span className="font-semibold">Settings</span>
            <p className="text-xs text-gray-500">Configure your account</p>
          </div>
        </div>
      </div>
    );
  };

  const renderChatArea = (contact: Contact) => {
    return (
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <div 
          className="h-16 px-4 flex items-center justify-between"
          style={{ 
            background: 'linear-gradient(135deg, #247EE4, #0069E0, #322F44)',
            opacity: isDarkMode ? 0.8 : 1
          }}
        >
          <div className="flex items-center gap-4">
            <FaUser className="w-10 h-10 rounded-full bg-white/90 p-2 text-[#247EE4]" />
            <div>
              <h3 className="text-white font-semibold">{contact.name}</h3>
              <span className="text-xs text-white/80">{contact.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white relative">
            <FaSearch className="w-5 h-5 cursor-pointer hover:text-white/80" />
            <FaImage className="w-5 h-5 cursor-pointer hover:text-white/80" />
            <div className="relative">
              <FaEllipsisV 
                className="w-5 h-5 cursor-pointer hover:text-white/80"
                onClick={handleMoreOptionsToggle} 
              />
              {renderMoreOptionsMenu()}
            </div>
          </div>
        </div>
        
        {/* Chat Messages Area */}
        <div 
          className="flex-1 p-6 overflow-y-auto"
          style={{ 
            background: isDarkMode ? '#1a1a1a' : '#f0f2f5',
            backgroundImage: `url(${bg_login.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isDarkMode ? 0.9 : 1
          }}
        >
          {contact.messages?.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-4 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`p-3 rounded-xl max-w-[70%] ${
                  message.sender === 'me' 
                    ? 'bg-[#247EE4] text-white' 
                    : 'bg-white text-black shadow-md'
                }`}
              >
                {message.text}
                <div className="text-xs mt-1 opacity-70 text-right">{message.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-xl"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            className="bg-[#247EE4] text-white p-2 rounded-full"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`flex h-screen transition-colors duration-300 ease-in-out`}
      style={{ background: theme.bg }}
    >
      {/* Left Sidebar */}
      <div 
        className="w-[400px] flex flex-col border-r transition-all duration-300"
        style={{ borderColor: theme.border }}
      >
        {/* Header */}
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
              <span className="text-white font-semibold">My Profile</span>
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

        {/* Search Bar */}
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
            <FaSearch className="absolute left-3 top-3 text-[#322F44] group-focus-within:text-[#247EE4] transition-colors" />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {contacts
            .filter(contact => 
              contact.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center p-4 cursor-pointer transition-all duration-300 relative ${
                  selectedContact === contact.id ? 'bg-[#f0f0f0]' : ''
                }`}
                onClick={() => {
                  setSelectedContact(contact.id);
                  setShowMoreOptions(false);
                }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <FaUser 
                      className="w-full h-full p-2" 
                      style={{ 
                        background: theme.secondary,
                        color: theme.primary 
                      }} 
                    />
                  </div>
                  {contact.status === 'online' && (
                    <FaCircle className="absolute bottom-0 right-0 text-[#14F400] text-xs" />
                  )}
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between items-center">
                    <h3 
                      className="font-semibold transition-colors"
                      style={{ color: theme.text }}
                    >
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
          ))}
        </div>
      </div>

      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          renderChatArea(contacts.find(c => c.id === selectedContact)!)
        ) : (
          <div 
            className="flex-1 flex flex-col items-center justify-center p-8"
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
              <button 
                className="bg-[#247EE4] text-white px-8 py-3 rounded-xl hover:bg-[#0069E0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={() => setSelectedContact(contacts[0].id)}
              >
                Start a discussion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat_initiate;

{/*
  // Import necessary dependencies
'use client'
import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaSearch, FaPlusCircle, FaEllipsisV, FaCircle, 
  FaMoon, FaSun, FaLock, FaImage, FaUserPlus, FaUsers, FaCog
} from 'react-icons/fa';
import Link from 'next/link';
import bg_login from '@/assets/bg_login.jpg';

// WebSocket connection for real-time messaging
const ws = new WebSocket('ws://your-backend-url/ws');

// Define TypeScript interfaces for data structures
interface Message {
  id: number;
  uuid: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  conversationUuid: string;
}

interface User {
  id: number;
  uuid: string;
  email: string;
  name: string;
  status: string;
}

interface Contact {
  id: number;
  uuid: string;
  name: string;
  status: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isTyping?: boolean;
  messages?: Message[];
}

interface LoginDto {
  email: string;
  password: string;
}

const Chat_initiate: React.FC = () => {
  // State management
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Theme configuration
  const theme = {
    bg: isDarkMode ? '#171717' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#171717',
    primary: '#247EE4',
    secondary: isDarkMode ? '#322F44' : '#D9D9D9',
    hover: isDarkMode ? '#2a2a2a' : '#f5f5f5',
    border: isDarkMode ? '#333333' : '#D9D9D9',
  };

  // Fetch user conversations on component mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`/api/conversations/users?conversationUuid=${currentUser?.uuid}`);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    if (currentUser) {
      fetchConversations();
    }
  }, [currentUser]);

  // Handle WebSocket messages
  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      updateContactMessages(message);
    };
  }, [contacts]);

  // Update contact messages when new message arrives
  const updateContactMessages = (newMessage: Message) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => {
        if (contact.uuid === newMessage.conversationUuid) {
          return {
            ...contact,
            lastMessage: newMessage.text,
            messages: [...(contact.messages || []), newMessage]
          };
        }
        return contact;
      })
    );
  };

  // Send message to backend
  const sendMessage = async () => {
    if (newMessage.trim() === '' || !selectedContact) return;

    const message = {
      text: newMessage,
      conversationUuid: contacts.find(c => c.id === selectedContact)?.uuid,
      sender: 'me',
      time: new Date().toISOString()
    };

    try {
      // Send message to backend
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });

      if (response.ok) {
        // Send message through WebSocket for real-time updates
        ws.send(JSON.stringify(message));
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Fetch previous messages for a conversation
  const fetchMessages = async (conversationUuid: string, fromMessage: string, limit: number = 5) => {
    try {
      const response = await fetch(
        `/api/messages/paginate?conversationUuid=${conversationUuid}&fromMessage=${fromMessage}&limit=${limit}`
      );
      const messages = await response.json();
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  // Login handler
  const handleLogin = async (loginDto: LoginDto) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDto)
      });
      
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // More options menu renderer
  const renderMoreOptionsMenu = () => {
    // ... (rest of the menu rendering code remains the same)
  };

  // Chat area renderer
  const renderChatArea = (contact: Contact) => {
    // ... (rest of the chat area rendering code remains the same)
  };

  return (
    <div 
      className={`flex h-screen transition-colors duration-300 ease-in-out`}
      style={{ background: theme.bg }}
    >
      {/* Left Sidebar */}
      {/*<div 
        className="w-[400px] flex flex-col border-r transition-all duration-300"
        style={{ borderColor: theme.border }}
      >
        {/* Header - Removed notification icon */}
        {/*<div className="h-16 relative overflow-hidden">
          <div className="absolute inset-0" 
               style={{
                 background: 'linear-gradient(135deg, #247EE4, #0069E0, #322F44)',
                 opacity: isDarkMode ? 0.8 : 1
               }}
          />
          <div className="relative h-full flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <FaUser className="w-10 h-10 rounded-full bg-white/90 p-2 text-[#247EE4]" />
              <span className="text-white font-semibold">
                {currentUser?.name || 'My Profile'}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-white">
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

        {/* Rest of the component remains the same */}
        {/* ... */}
     {/* </div>
    </div>
  );
};

export default Chat_initiate;
  
  */ }