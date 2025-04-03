import axios from '@/lib/axios';
import { useCallback } from 'react';

interface User {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  online: boolean;
  avatar: string;
  createdAt: string;
}

interface CreateUserDto {
  [key: string]: any;
}

interface AddContactDto {
  [key: string]: any;
}

interface ManageUserProps {
  organizationToken: string;
}

export const useManageUser = ({ organizationToken }: ManageUserProps) => {
    const createUser = useCallback(async (userData: CreateUserDto) => {
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
    }, [organizationToken]);

    const getAllUsers = useCallback(async (projectId: string) => {
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
    }, [organizationToken]);

    const deleteUser = useCallback(async (userId: string) => {
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
    }, [organizationToken]);

    const addContact = useCallback(async (contactData: AddContactDto) => {
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
    }, [organizationToken]);

    return {
        createUser,
        getAllUsers,
        deleteUser,
        addContact,
    };
};