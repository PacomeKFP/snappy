import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { PlusCircle, Search, X } from 'lucide-react';
import { useManageUser } from '@/hooks/manageUser';
import { useAuth } from '@/hooks/auth';
import { v4 as uuidv4 } from "uuid";

interface CreateTableProps {
    name : string,

}
const TablesHeader: React.FC = () => {
    const { organization, token } = useAuth({ middleware: 'auth' });
    const { createUser } = useManageUser({ organizationToken: token || '' });
    const secretDefault = '1234567890';
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [newUser, setNewUser] = useState<CreateUserDto>({
        projectId: organization?.projectId?.toString() || '',
        externalId: uuidv4(),
        avatar: '',
        displayName: '',
        email: '',
        phoneNumber: '',
        login: '',
        secret: secretDefault, 
        customJson: {},
    });



    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCustomJsonChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            customJson: {
                ...prev.customJson,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!newUser.displayName || !newUser.login || !newUser.secret) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        try {
            await createUser(newUser);
            setNewUser({
                projectId: organization?.projectId?.toString() || '',
                externalId: '',
                avatar: '',
                displayName: '',
                email: '',
                phoneNumber: '',
                login: '',
                secret: secretDefault,
                customJson: {},
            });
            setIsModalOpen(false);
        } catch (error) {
            console.log("Infos user",newUser)
            console.error('Erreur lors de la création de l\'utilisateur :', error);
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
                    placeholder="Rechercher des utilisateurs..."
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
                Add User
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        
                        <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel utilisateur</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="displayName" className="block mb-2 text-sm font-medium">Nom</label>
                                <input
                                    type="text"
                                    id="displayName"
                                    name="displayName"
                                    value={newUser.displayName}
                                    onChange={handleInputChange}
                                    placeholder="Entrez le nom de l'utilisateur"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="login" className="block mb-2 text-sm font-medium">Login</label>
                                <input
                                    type="text"
                                    id="login"
                                    name="login"
                                    value={newUser.login}
                                    onChange={handleInputChange}
                                    placeholder="Entrez le login de l'utilisateur"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="secret" className="block mb-2 text-sm font-medium">Secret</label>
                                <input
                                    type="text"
                                    id="secret"
                                    name="secret"
                                    value={newUser.secret}
                                    onChange={handleInputChange}
                                    placeholder="Entrez le secret de l'utilisateur"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={newUser.email || ''}
                                    onChange={handleInputChange}
                                    placeholder="Entrez l'email de l'utilisateur"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">Phone number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={newUser.phoneNumber || ''}
                                    onChange={handleInputChange}
                                    placeholder="Entrez le numero de telephone"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            {/* <div>
                                <label htmlFor="avatar" className="block mb-2 text-sm font-medium">Avatar</label>
                                <input
                                    type="text"
                                    id="avatar"
                                    name="avatar"
                                    value={newUser.avatar || ''}
                                    onChange={handleInputChange}
                                    placeholder="Entrez l'URL de l'avatar"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="customJson" className="block mb-2 text-sm font-medium">Custom JSON</label>
                                <input
                                    type="text"
                                    id="customJson"
                                    name="customJson"
                                    value={newUser.customJson ? JSON.stringify(newUser.customJson) : ''}
                                    onChange={(e) => {
                                        try {
                                            const parsedValue = JSON.parse(e.target.value);
                                            setNewUser(prev => ({
                                                ...prev,
                                                customJson: parsedValue,
                                            }));
                                        } catch (error) {
                                            console.error('Invalid JSON');
                                        }
                                    }}
                                    placeholder='Entrez un JSON valide (ex: {"key": "value"})'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div> */}
                            
                            <div className="flex justify-end space-x-2 mt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
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

export default TablesHeader;