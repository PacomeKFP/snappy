/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUser, FaSearch, FaPaperPlane, FaEllipsisV, 
  FaSmile, FaPaperclip, FaMicrophone, FaCircle 
} from 'react-icons/fa';

const Chat_discussion = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", sender: "other", time: "12:25" },
    { id: 2, text: "I'm doing great, thanks! How about you?", sender: "me", time: "12:26" },
    { id: 3, text: "Pretty good! Did you see the new updates?", sender: "other", time: "12:26" },
    { id: 4, text: "Yes, they look amazing! 😊", sender: "me", time: "12:27" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    bg: isDarkMode ? '#171717' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#171717',
    primary: '#247EE4',
    messageOther: isDarkMode ? '#2a2a2a' : '#f0f0f0',
    messageMe: '#247EE4',
    inputBg: isDarkMode ? '#2a2a2a' : '#f5f5f5',
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: "me",
          time: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })
        }
      ]);
      setNewMessage("");
      // Simulate other person typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "Thanks for your message! 👍",
          sender: "other",
          time: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })
        }]);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: theme.bg }}>
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between bg-gradient-to-r from-[#247EE4] to-[#0069E0]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaUser className="w-10 h-10 rounded-full bg-white/90 p-2 text-[#247EE4]" />
            <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
          </div>
          <div>
            <h3 className="text-white font-semibold">John Doe</h3>
            <span className="text-xs text-white/80">online</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white">
          <FaSearch className="w-5 h-5 cursor-pointer hover:text-white/80 transition-colors" />
          <FaEllipsisV className="w-5 h-5 cursor-pointer hover:text-white/80 transition-colors" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" 
           style={{ background: isDarkMode ? '#1a1a1a' : '#f0f2f5' }}>
        {messages.map((message) => (
          <div key={message.id} 
               className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] break-words rounded-2xl px-4 py-2 ${
              message.sender === 'me' 
                ? 'bg-[#247EE4] text-white'
                : 'bg-white shadow-sm'
            }`}>
              <p className="mb-1">{message.text}</p>
              <p className="text-xs opacity-70 text-right">{message.time}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" 
                   style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" 
                   style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" 
                   style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm">typing...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t" style={{ borderColor: theme.inputBg }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="w-full px-4 py-3 rounded-full pr-12"
              style={{ 
                background: theme.inputBg,
                color: theme.text,
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <FaSmile className="w-5 h-5 text-gray-500 cursor-pointer hover:text-[#247EE4] transition-colors" />
              <FaPaperclip className="w-5 h-5 text-gray-500 cursor-pointer hover:text-[#247EE4] transition-colors" />
            </div>
          </div>
          {newMessage ? (
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-[#247EE4] text-white flex items-center justify-center hover:bg-[#0069E0] transition-colors"
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          ) : (
            <button className="w-10 h-10 rounded-full bg-[#247EE4] text-white flex items-center justify-center hover:bg-[#0069E0] transition-colors">
              <FaMicrophone className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat_discussion;