"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import Avatar from "./Avatar";
import { ChatResource } from "@/lib/models";
import { useChat } from "@/context/ChatContext";
import { formatTime } from "@/utils/dateFormat";
import { SearchBar } from "@/components/SearchBar";
import MessageAckStatus from "@/components/MessageAckStatus";

export default function ConversationList() {
	const { chats, chatsLoading, setInterlocutorHandler } = useChat();

	const [filteredChats, setFilteredChats] = useState<ChatResource[]>(chats);
	const [selectedId, setSelectedId] = useState<string>("");
	const [hoveredId, setHoveredId] = useState<string>("");

	// ---
	const hey = (id: string) => {
		setSelectedId(id);
		setInterlocutorHandler(id);

		console.log("Zuchuon was here :)");
	};
	// ---

	// ---
	const handleSearch = (term: string) => {
		if (!term.trim()) {
			setFilteredChats(chats);
			return;
		}

		const filtered = chats.filter(
			(chat) =>
				chat.user?.displayName
					?.toLowerCase()
					.includes(term.toLowerCase()) ||
				chat.lastMessage?.body
					?.toLowerCase()
					.includes(term.toLowerCase())
		);
		setFilteredChats(filtered);
	};
	// ---

	return (
		<aside className="w-[380px] h-screen bg-gray-50 border-r border-gray-200 flex flex-col fixed translate-x-[72px]">
			<div className="p-4 border-b bg-white">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold text-snappy-purple">
						YowTalk
					</h1>
					<span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
						Beta
					</span>
				</div>
				<SearchBar onSearch={handleSearch} />
			</div>

			<div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
				{chatsLoading ? (
					<div className="flex items-center justify-center h-full">
						<Loader2 className="w-8 h-8 text-snappy-purple animate-spin" />
						<span className="ml-2 text-snappy-gray font-medium">
							Chargement...
						</span>
					</div>
				) : (
					<div className="space-y-1 p-2">
						{filteredChats.map((chat) => (
							<div
								key={chat.user?.externalId}
								onClick={() =>
									hey(
										chat.user?.externalId
											? chat.user?.externalId
											: ""
									)
								} // ---
								onMouseEnter={() =>
									setHoveredId(
										chat.user?.externalId
											? chat.user?.externalId
											: ""
									)
								}
								onMouseLeave={() => setHoveredId("")}
								className={`flex items-center p-3 cursor-pointer transition-all duration-200 rounded-lg
									${selectedId === chat.user?.externalId ? "bg-blue-100 border-l-4 border-blue-500" : "bg-white"}
									${hoveredId === chat.user?.externalId ? "transform scale-[0.995] shadow-sm" : ""}
									hover:bg-blue-50`}
							>
								<div className="relative flex-shrink-0">
									<Avatar
										src={chat.user?.avatar}
										alt={"Profile"}
										size={12}
									/>
									{chat.user?.online && (
										<div className="absolute bottom-0 right-0 w-3 h-3 bg-snappy-purple rounded-full border-2 border-white"></div>
									)}
								</div>
								<div className="flex-1 min-w-0 ml-3">
									<div className="flex justify-between items-start">
										<h3 className="font-semibold text-gray-900 truncate">
											{chat.user?.displayName}
										</h3>
										<span className="text-xs text-gray-600 flex-shrink-0 ml-2">
											{formatTime(
												chat.lastMessage?.updatedAt
													? chat.lastMessage
															?.updatedAt
													: new Date()
											)}
										</span>
									</div>
									<div className="flex justify-between items-start">
										<p className="text-sm text-gray-700 truncate">
											{chat.lastMessage?.body}
										</p>
										<MessageAckStatus
											ack={
												chat.lastMessage?.ack
													? chat.lastMessage?.ack
													: undefined
											}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</aside>
	);
}
