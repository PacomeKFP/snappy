'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import { ThemeProvider, useTheme } from '@/components/ThemeContext';
import { User, Message } from '@/services/types';
import bg_login from '@/assets/bg_login.jpg';

// Initialize socket connection for receiving messages only
const socket = io('http://localhost:8001'); // Replace with your WebSocket server URL

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch initial users from API
    axios.get<User[]>('/users').then((response) => {
      setUsers(response.data);
    });

    // Listen for new messages via WebSocket
    socket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup the WebSocket listener on unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!selectedUser || content.trim() === '') return;

    const newMessage = {
      uuid: 'temporary-id', // Placeholder, will be replaced by server
      author: 'current-user-uuid', // Replace with the actual logged-in user's UUID
      conversation: selectedUser.uuid,
      content,
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // Send message to server via HTTP POST request
      const response = await axios.post<Message>('/messages', newMessage);
      const savedMessage = response.data;

      // Update local state with the new message
      setMessages((prevMessages) => [...prevMessages, savedMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen" style={{ backgroundImage: `url(${bg_login.src})` }}>
        <Sidebar users={users} setSelectedUser={setSelectedUser} />
        <main className="flex-1">
          {selectedUser ? (
            <ChatArea user={selectedUser} messages={messages} onSendMessage={handleSendMessage} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2>Select a user to start chatting</h2>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Chat;
