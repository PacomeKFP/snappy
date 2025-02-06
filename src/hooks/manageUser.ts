import axios from '@/lib/axios';

interface ManageUserProps {
    organizationToken: string; // Token de l'organisation connectée
}

export const useManageUser = ({ organizationToken }: ManageUserProps) => {
    const createUser = async (userData: CreateUserDto) => {
        try {
            const response = await axios.post<User>('/users/create', userData, {
                headers: {
                    Authorization: `Bearer ${organizationToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            throw error;
        }
    };

    const getAllUsers = async (projectId: string) => {
        try {
            const response = await axios.get<User[]>('/users/find-all', {
                params: { projectId },
                headers: {
                    Authorization: `Bearer ${organizationToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            throw error;
        }
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (userId: string) => {
        try {
            await axios.delete(`/users/delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${organizationToken}`,
                },
            });
        } catch (error: any) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            throw error;
        }
    };

    // Fonction pour ajouter un contact à un utilisateur
    const addContact = async (contactData: AddContactDto) => {
        try {
            const response = await axios.post<User[]>('/users/add-contact', contactData, {
                headers: {
                    Authorization: `Bearer ${organizationToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erreur lors de l\'ajout du contact :', error);
            throw error;
        }
    };

    return {
        createUser,
        getAllUsers,
        deleteUser,
        addContact,
    };
};