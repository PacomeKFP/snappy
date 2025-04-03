import axios from '@/lib/axios';
import { useCallback } from 'react';

interface Bot {
  id: string;
  [key: string]: any;
}

interface User {
  id: string;
  displayName: string;
  email: string;
  // autres propriétés nécessaires
  [key: string]: any;
}

interface CreateBotDto {
  // Définissez le type selon vos besoins
  [key: string]: any;
}

interface ManageBotProps {
  organizationToken: string;
}

export const useManageBot = ({ organizationToken }: ManageBotProps) => {
    // Mémorisation de createBot pour éviter les recréations à chaque rendu
    const createBot = useCallback(async (botData: CreateBotDto) => {
        try {
            const response = await axios.post<User>('/chatbot/create', botData, {
                headers: {
                    Authorization: `Bearer ${organizationToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erreur lors de la création du bot :', error);
            throw error;
        }
    }, [organizationToken]);

    // Mémorisation de getAllBots pour éviter les recréations à chaque rendu
    // Correction de l'URL - il y a un problème avec le format `:projectId` suivi d'un `?projectId=`
    const getAllBots = useCallback(async (projectId: string) => {
        try {
            // Correction de l'URL: soit utiliser un paramètre de chemin, soit un paramètre de requête, mais pas les deux
            const response = await axios.get<Bot[]>(`/chatbot/project-chatbot/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${organizationToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erreur lors de la récupération des bots :', error);
            throw error;
        }
    }, [organizationToken]);

    const addBot = useCallback(async (botData: CreateBotDto) => {
        try {
            const response = await axios.post<Bot[]>('/chatbot/create', botData, {
                headers: {
                    Authorization: `Bearer ${organizationToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erreur lors de l\'ajout du bot :', error);
            throw error;
        }
    }, [organizationToken]);

    return {
        createBot,
        getAllBots,
        addBot,
    };
};