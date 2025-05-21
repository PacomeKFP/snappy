"use client";

import { ChatProvider } from "@/context/ChatContext";
import { Conversation } from "../components/Conversation";
import ConversationList from "../components/ConversationList";

export default function Home() {
	return (
		<div className="flex h-full overflow-hidden">
			<ChatProvider>
				<ConversationList />
				<main className="flex-1 overflow-y-auto relative h-full">
					<Conversation />
				</main>
			</ChatProvider>
		</div>
	);
}
