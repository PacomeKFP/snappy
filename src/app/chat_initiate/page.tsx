/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react';
import { FaSearch, FaUsers as FaUser, FaPlusCircle, FaCog, FaCommentAlt } from 'react-icons/fa';
import Link from 'next/link';
import bg_login from '@/assets/bg_login.jpg';

interface Contact {
  id: number;
  name: string;
  status: string;
}

const ChatInitiate: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'XXXXXX 0', status: 'Offline' },
    { id: 2, name: 'XXXXXX 0', status: 'Offline' },
    { id: 3, name: 'XXXXXXX 0', status: 'Offline' },
  ]);

  return (
    <div className="flex h-screen bg-[#ffffff]">
      {/* Sidebar */}
      <div className="w-16 bg-[#247EE4] flex flex-col items-center py-4 space-y-8">
        <FaCommentAlt className="text-[#ffffff] text-2xl" />
        <FaUser className="text-[#ffffff] text-2xl" />
        <FaPlusCircle className="text-[#ffffff] text-2xl" />
        <div className="flex-grow" />
        <FaCog className="text-[#ffffff] text-2xl" />
      </div>

      {/* Contact List */}
      <div className="w-531 bg-[#ffffff] p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-8 pr-4 rounded-3xl border-2 border-[#D9D9D9] bg-[#D9D9D9] text-[#171717]"
          />
          <FaSearch className="absolute right-2 top-2.5 text-[#171717]" size={18} />
        </div>
        {contacts.map((contact) => (
          <Link href={`/chat/chat-discussion/${contact.id}`} key={contact.id}>
            <div className="flex items-center mb-4 cursor-pointer">
              <FaUser className="w-10 h-10 rounded-full bg-[#D9D9D9] mr-3" />
              <div>
                <p className="text-[#171717] font-semibold">{contact.name}</p>
                <p className="text-sm text-[#171717]">{contact.status}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center bg-[#ffffff]" style={{
        backgroundImage: `url(${bg_login.src})`,  
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <h1 className="text-6xl font-bold text-[#247EE4] mb-4">Snappy</h1>
        <p className="text-[#171717] mb-6 text-center">
          Welcome to Snappy, connect with friends and colleagues either for friendly<br />
          conversations.
        </p>
        <button className="bg-[#247EE4] text-[#ffffff] px-6 py-2 rounded hover:bg-[#0069E0]">
          Start a conversation
        </button>
      </div>
    </div>
  );
};

export default ChatInitiate;
