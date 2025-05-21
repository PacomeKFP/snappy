"use client";

import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from "react";

import {
	getChatDetailsData,
	getUserChatsData,
	sendMessageData,
	externalID,
	projectID,
	ChatAPI
} from "@/datas/mockDatas";

import {
	GetChatDetailsDto,
	SendMessageDto,
	ChatResource,
	Message,
	User,
} from "@/lib/models";

interface ChatContextType {
	chats: ChatResource[];
	chatsLoading: boolean;
	interlocutor: User | undefined;
	setInterlocutorHandler: (interlocutor: string | undefined) => void;
	messages: Message[];
	messagesLoading: boolean;
	sendMessageHandler: (message: string) => void;
}

// Clé utilisée pour stocker les messages dans localStorage
const MESSAGES_STORAGE_PREFIX = "yowTalk_messages_";

// Fonction pour obtenir la clé de stockage pour un interlocuteur spécifique
const getStorageKey = (interlocutorId: string) => `${MESSAGES_STORAGE_PREFIX}${interlocutorId}`;

// 1. Création du contexte
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// 2. Création d'un Provider
export const ChatProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// --- Chats loading
	const [chats, setChats] = useState<ChatResource[]>([]);
	const [chatsLoading, setChatsLoading] = useState<boolean>(true);

	useEffect(() => {
		getUserChatsData().then((chats) => {
			setChatsLoading(false);
			setChats(chats);
		});
	}, []);
	// ---

	// --- Messages loading
	const [interlocutor, setInterlocutor] = useState<User>();
	const [messages, setMessages] = useState<Message[]>([]);
	const [messagesLoading, setMessagesLoading] = useState<boolean>(false);

	// Fonction pour sauvegarder les messages dans localStorage
	const saveMessagesToLocalStorage = (interlocutorId: string | undefined, messages: Message[]) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(getStorageKey(interlocutorId ? interlocutorId : ""), JSON.stringify(messages));
		}
	};

	// Fonction pour récupérer les messages depuis localStorage
	const getMessagesFromLocalStorage = (interlocutorId: string): Message[] | null => {
		if (typeof window !== 'undefined') {
			const storedMessages = localStorage.getItem(getStorageKey(interlocutorId));
			return storedMessages ? JSON.parse(storedMessages) : null;
		}
		return null;
	};

	const setInterlocutorHandler = (interlocutorId: string | undefined) => {
		setMessagesLoading(true);
		setMessages([]); // Réinitialiser les messages lors du changement d'interlocuteur

		const selectedUser = chats.find(
			(chat) => chat.user?.externalId === interlocutorId
		)?.user;
		setInterlocutor(selectedUser);

		if (selectedUser?.externalId) {
			// Vérifier d'abord si les messages sont dans le localStorage
			const cachedMessages = getMessagesFromLocalStorage(selectedUser.externalId);
			
			if (cachedMessages) {
				// Utiliser les messages du cache
				setMessages(cachedMessages);
				setMessagesLoading(false);

			} else {
				// Si pas de cache, charger depuis l'API
				const dto: GetChatDetailsDto = {
					user: externalID,
					interlocutor: selectedUser.externalId,
					projectId: projectID,
				};

				getChatDetailsData(dto)
					.then((data) => {
						const messagesData = data.messages ? data.messages : [];
						setMessages(messagesData);

						// Stocker les messages dans localStorage
						saveMessagesToLocalStorage(selectedUser.externalId, messagesData);
					})
					.finally(() => {
						setMessagesLoading(false);
					});
			}

		} else {
			setMessagesLoading(false);
		}
	};
	// ---

	// --- Message Sending
	const sendMessageHandler = (message: string) => {
		if (!interlocutor) return;

		const dto: SendMessageDto = {
			senderId: externalID,
			receiverId: interlocutor.externalId ? interlocutor.externalId : "",
			body: message,
			attachements: [],
			projectId: projectID,
		};

		sendMessageData(dto)
			.then((data) => {
				// Mettre à jour l'état des messages
				const updatedMessages = [...messages, data];
				setMessages(updatedMessages);

				// Mettre à jour le cache dans localStorage
				saveMessagesToLocalStorage(interlocutor.externalId, updatedMessages);

				// Mettre à jour le lastMessage du chat correspondant
				setChats((prevChats) => {
					return prevChats.map((chat) => {
						// Si c'est le chat avec l'interlocuteur actuel
						if (chat.user?.externalId === interlocutor.externalId) {
							// Créer une copie du chat avec le nouveau lastMessage
							return {
								...chat,
								lastMessage: data, // Message renvoyé par l'API
							};
						}
						return chat;
					});
				});
			})
			.catch((error) => {
				alert("Erreur lors de l'envoie du message: " + error);
			});
	};
	// ---

	return (
		<ChatContext.Provider
			value={{
				chats,
				chatsLoading,
				interlocutor,
				setInterlocutorHandler,
				messages,
				messagesLoading,
				sendMessageHandler,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

// 3. Hook personnalisé pour utiliser le contexte
export const useChat = (): ChatContextType => {
	const context = useContext(ChatContext);
	if (context === undefined) {
		throw new Error("useChat must be used within a ChatProvider !");
	}
	return context;
};
