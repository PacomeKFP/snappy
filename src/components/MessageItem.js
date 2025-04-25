export default function MessageItem({ message, isUser }) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div 
          className={`max-w-[80%] rounded-lg px-4 py-3 ${
            isUser 
              ? 'bg-blue-500 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message}</p>
        </div>
      </div>
    );
  }