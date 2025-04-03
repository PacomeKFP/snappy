import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  X, 
} from 'lucide-react';
import Image from 'next/image';

interface SortConfig {
  key: keyof Bot;
  direction: 'asc' | 'desc';
}
interface Bot {
  id: string;
  [key: string]: any;
}

interface BotDetailsModalProps {
  bot: Bot;
  onClose: () => void;
}

interface TableThreeProps {
  bots: Bot[];
}

const TableThree: React.FC<TableThreeProps> = ({ bots }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'label', direction: 'asc' });
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const itemsPerPage = 10;

  const sortedBots = useMemo(() => {
    let sortableBots = [...bots];
    sortableBots.sort((a: Bot, b: Bot) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableBots;
  }, [bots, sortConfig]);

  const paginatedBots = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return sortedBots.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedBots]);

  const handleSort = (key: keyof Bot) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleViewBot = (bot: Bot) => {
    setSelectedBot(bot);
  };

  const handleDeleteBot = (botId: string) => {
    console.log(`Deleting bot with ID: ${botId}`);
  };

  const totalPages = Math.ceil(bots.length / itemsPerPage);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort('label')}
                >
                  Label {sortConfig.key === 'label' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort('prompt')}
                >
                  Prompt {sortConfig.key === 'prompt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Language Model</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBots.map(bot => (
                <tr key={bot.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center">
                    {bot.label}
                  </td>
                  <td className="px-4 py-3">{bot.prompt}</td>
                  <td className="px-4 py-3">{bot.description}</td>
                  <td className="px-4 py-3">{bot.languageModel}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleViewBot(bot)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        onClick={() => handleDeleteBot(bot.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <ChevronsLeft />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <ChevronRight />
            </button>
            <button 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <ChevronsRight />
            </button>
          </div>
        </div>
      </div>

      {selectedBot && (
        <BotDetailsModal 
          bot={selectedBot} 
          onClose={() => setSelectedBot(null)} 
        />
      )}
    </>
  );
};

const BotDetailsModal: React.FC<BotDetailsModalProps> = ({ bot, onClose }) => {
  if (!bot) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-xl font-semibold">{bot.label}</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Prompt:</span>
            <span>{bot.prompt}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Description:</span>
            <span>{bot.description}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Language Model:</span>
            <span>{bot.languageModel}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Created At:</span>
            <span>{new Date(bot.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Updated At:</span>
            <span>{new Date(bot.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableThree;