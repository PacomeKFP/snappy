import axios from '@/lib/axios';

interface ManageBotProps {
    organizationToken: string; // Token de l'organisation connectée
}

export const manageBot = ({ organizationToken }: ManageBotProps) => {
    const createBot = async (botData: CreateBotDto) => {
        try {
            const response = await axios.post<User>('/chatbot/create', botData, {
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

    const getAllBots = async (projectId: string) => {
        try {
            const response = await axios.get<Bot[]>(`/chatbot/project-chatbot/:projectId?projectId=${projectId}`, {
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

    const addBot = async (botData: CreateBotDto) => {
        try {
            const response = await axios.post<Bot[]>('/chatbot/create', botData, {
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
        createBot,
        getAllBots,
        addBot,
    };
};