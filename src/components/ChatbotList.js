import ChatbotCard from './ChatbotCard';

export default function ChatbotList({ chatbots }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {chatbots.map((chatbot) => (
        <ChatbotCard key={chatbot.accesskeys} chatbot={chatbot} />
      ))}
    </div>
  );
}