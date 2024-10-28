/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaSearch, FaUsers, FaPlusCircle, FaCog, FaCommentAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChatInitiate = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Dragueur 0', status: 'Offline' },
    { id: 2, name: 'Dragueur 0', status: 'Offline' },
    { id: 3, name: 'Dragueur 0', status: 'Offline' },
  ]);

  const navigate = useNavigate();

  const handleContactClick = (contactId: number) => {
    navigate(`/chat/chat-discussion/${contactId}`);
  };

  return (
    <div className="flex h-screen bg-[#ffffff]">
      {/* Sidebar */}
      <div className="w-16 bg-[#247EE4] flex flex-col items-center py-4 space-y-8">
        <FaCommentAlt className="text-[#ffffff] text-2xl" />
        <FaUsers className="text-[#ffffff] text-2xl" />
        <FaPlusCircle className="text-[#ffffff] text-2xl" />
        <div className="flex-grow" />
        <FaCog className="text-[#ffffff] text-2xl" />
      </div>

      {/* Contact List */}
      <div className="w-64 bg-[#D9D9D9] p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-8 pr-4 rounded bg-[#ffffff] text-[#171717]"
          />
          <FaSearch className="absolute left-2 top-2.5 text-[#171717]" size={18} />
        </div>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => handleContactClick(contact.id)}
          >
            <div className="w-10 h-10 rounded-full bg-[#322F44] mr-3" />
            <div>
              <p className="text-[#171717] font-semibold">{contact.name}</p>
              <p className="text-sm text-[#171717]">{contact.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center bg-[#ffffff]">
        <h1 className="text-4xl font-bold text-[#247EE4] mb-4">Snappy</h1>
        <p className="text-[#171717] mb-6 text-center">
          Welcome to Snappy connect with friends and colleagues either for friendly<br />
          conversations 
        </p>
        <button className="bg-[#247EE4] text-[#ffffff] px-6 py-2 rounded hover:bg-[#0069E0]">
          Start a conversation
        </button>
      </div>
    </div>
  );
};

export default ChatInitiate;