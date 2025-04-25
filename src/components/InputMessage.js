import { useState } from 'react';
import { HiPaperAirplane } from 'react-icons/hi';

export default function InputMessage({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez votre message ici..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
        />
        <button
          type="submit"
          className={`p-3 rounded-r-lg ${
            disabled || !message.trim() 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-500/90'
          } text-white`}
          disabled={disabled || !message.trim()}
        >
          <HiPaperAirplane className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}