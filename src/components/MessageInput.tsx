'use client';
import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 flex gap-2 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        className="flex-1 p-2 border rounded"
        placeholder="Type a message..."
      />
      <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
