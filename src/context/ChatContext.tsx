"use client";

import {
	createContext,
	ReactNode,
	useContext,
	useState,
	useEffect,
} from "react";

import {
	getUserChatsData,
	getChatDetailsData,
	externalID,
	projectID,
} from "@/datas/mockDatas";
import { ChatResource, GetChatDetailsDto, Message, User } from "@/lib/models";

interface ChatContextType {
	chats: ChatResource[];
	chatsLoading: boolean;
	interlocutor: User | undefined;
	setInterlocutorHandler: (interlocutor: string) => void;
	messages: Message[];
}

// 1. Création du contexte
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// 2. Création d'un Provider
export const ChatProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// ---
	const [chats, setChats] = useState<ChatResource[]>([]);
	const [chatsLoading, setChatsLoading] = useState<boolean>(true);

	useEffect(() => {
		getUserChatsData().then((chats) => {
			setChatsLoading(false);
			setChats(chats);
		});
	}, []);
	// ---

	// ---
	const [interlocutor, setInterlocutor] = useState<User>();
	const setInterlocutorHandler = (interlocutor: string) => {
		setInterlocutor(
			chats.find((chat) => chat.user?.externalId === interlocutor)?.user
		);
	};
	// ---

	// ---
	const [messages, setMessages] = useState<Message[]>([]);
	const [dto, setDto] = useState<GetChatDetailsDto>();

	useEffect(() => {
		setDto({
			user: externalID,
			interlocutor: interlocutor?.externalId,
			projectId: projectID,
		});

		if (dto?.interlocutor) {
			getChatDetailsData(dto).then((data) => {
				setMessages(data.messages ? data.messages : []);
			});
		}
	}, [interlocutor]);
	// ---

	return (
		<ChatContext.Provider
			value={{
				chats,
				chatsLoading,
				interlocutor,
				setInterlocutorHandler,
				messages,
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
