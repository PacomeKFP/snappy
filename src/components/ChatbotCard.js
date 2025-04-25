import Link from 'next/link';
import { HiChatAlt, HiChevronRight } from 'react-icons/hi';

export default function ChatbotCard({ chatbot }) {
  return (
    <Link href={`/chat/${chatbot.accesskeys}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200">
        <div className="flex items-start">
          <div className="bg-blue-500/10 p-3 rounded-full mr-4">
            <HiChatAlt className="text-blue-500 text-xl" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{chatbot.label}</h3>
            <p className="text-gray-500 mt-1">{chatbot.description}</p>
          </div>
          <HiChevronRight className="text-gray-400 text-xl" />
        </div>
      </div>
    </Link>
  );
}