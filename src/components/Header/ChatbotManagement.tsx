import React, { useState, ChangeEvent, FormEvent } from 'react';
import { PlusCircle, Search, X } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";
import { manageBot } from '@/hooks/manageBot';
import { useAuth } from '@/hooks/auth';

const ChatbotManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const {organization, token} = useAuth({ middleware: 'auth'});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { addBot } = manageBot({ organizationToken: token || "" });
    const [newChatbot, setNewChatbot] = useState({
        label: '',
        prompt: '',
        description: '',
        languageModel: 'MISTRAL',
        projectId: organization?.projectId?.toString() || ''
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setNewChatbot(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!newChatbot.label || !newChatbot.prompt || !newChatbot.languageModel) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        try{
            await addBot(newChatbot);
            setNewChatbot({
                label: '',
                prompt: '',
                description: '',
                languageModel: "MISTRAL",
                projectId: organization?.projectId?.toString() || ''
            })
            console.log("Nouveau Chatbot ajouté:", newChatbot);
            setIsModalOpen(false);
        }catch(error){
            console.error('Erreur lors de l\'ajout du bot :', error);
        }
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="relative flex-grow max-w-md mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />    
                </div>
                <input
                    type="text"
                    placeholder="Rechercher des chatbots..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                <PlusCircle className="h-5 w-5 mr-2" />
                Ajouter Chatbot
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau Chatbot</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Nom du Chatbot</label>
                                <input
                                    type="text"
                                    name="label"
                                    value={newChatbot.label}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder="Nom du Chatbot"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Prompt</label>
                                <textarea
                                    name="prompt"
                                    value={newChatbot.prompt}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder="Prompt"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={newChatbot.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder='Description'
                                ></textarea>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Modèle de Langage</label>
                                <input
                                    type="text"
                                    name="languageModel"
                                    value={newChatbot.languageModel}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder='Modèle de Langage'
                                />
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                    Annuler
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotManagement;
