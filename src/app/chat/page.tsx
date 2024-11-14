// src/chat/page.tsx
"use client";

import React from 'react';
import ChatArea from '../../components/ChatArea';
import ChatHeader from '../../components/ChatHeader';
import Sidebar from '../../components/Sidebar';
import MessageInput from '../../components/MessageInput';
import UserList from '../../components/UserList';

const ChatPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar for contacts or options */}
      <Sidebar />

      {/* Main chat area */}
      <div className="flex flex-col w-full">
        {/* Header section, e.g., chat title and options */}
        <ChatHeader />

        {/* Chat messages */}
        <ChatArea />

        {/* Input area for new messages */}
        <MessageInput />
      </div>

      {/* Optional user list on the right */}
      <UserList />
    </div>
  );
};

export default ChatPage;
