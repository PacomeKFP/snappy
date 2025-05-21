"use client";

import Avatar from "./Avatar";
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, PaperclipIcon, Smile } from "lucide-react";

import { EMOJIS } from "@/utils/emojis";
import { formatTime } from "@/utils/dateFormat";
import { useChat } from "@/context/ChatContext";
import MessageAckStatus from "./MessageAckStatus";

export const Conversation: React.FC = () => {
	const { interlocutor, messages, messagesLoading, sendMessageHandler } =	useChat();

	const [message, setMessage] = useState("");
	const [sliderPosition, setSliderPosition] = useState(1); // 0: rouge, 1: orange, 2: vert
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [activeEmojiCategory, setActiveEmojiCategory] = useState<keyof typeof EMOJIS>("smileys");

	const emojiPickerRef = useRef<HTMLDivElement>(null);

	// Ferme le sélecteur d'émojis lorsqu'on clique en dehors
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(event.target as Node)
			) {
				setShowEmojiPicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSendMessage = () => {
		if (message.trim()) {
			sendMessageHandler(message);
			setMessage("");
		}
	};

	const insertEmoji = (emoji: string) => {
		setMessage((prev) => prev + emoji);
	};

	const toggleEmojiPicker = () => {
		setShowEmojiPicker((prev) => !prev);
	};

	const sendFile = () => {
		console.log("Envoie de fichier.");
	};

	const getSliderColor = () => {
		switch (sliderPosition) {
			case 0:
				return "bg-red-500";

			case 1:
				return "bg-orange-500";

			case 2:
				return "bg-green-500";

			default:
				return "bg-orange-500";
		}
	};

	const moveSlider = () => {
		setSliderPosition((prev) => (prev + 1) % 3);
	};

	if (interlocutor === undefined) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-center p-6">
				<div className="animate-pulse">
					<h1 className="text-4xl font-bold text-purple-600 mb-4">
						Bienvenue à YowTalk
					</h1>
					<p className="text-gray-600 max-w-md mx-auto">
						Sélectionnez une conversation pour commencer à discuter
						avec vos contacts.
					</p>
				</div>
			</div>
		);
	}

	const categoryNames: Record<keyof typeof EMOJIS, string> = {
		smileys: "Émoticônes",
		people: "Personnes",
		animals: "Animaux",
		food: "Nourriture",
		activities: "Activités",
		travel: "Voyage",
		objects: "Objets",
		symbols: "Symboles",
	};

	return (
		<div className="flex flex-col h-full bg-gray-50">
			{/* Conteneur principal divisé en 3 parties verticales */}

			{/* 1. En-tête avec profil */}
			<div
				className="flex items-center p-4 bg-white shadow-sm"
				style={{ borderBottom: "1px solid rgba(123, 82, 171, 0.1)" }}
			>
				<div className="flex items-center flex-1">
					<div className="relative">
						<Avatar
							src={interlocutor.avatar ? interlocutor.avatar : ""}
							alt={"Profile"}
							size={12}
						/>
						<div
							className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-${interlocutor.online ? "snappy-purple" : "snappy-gray"}`}
						></div>
					</div>
					<div className="ml-3">
						<h3 className="font-medium text-gray-800">
							{interlocutor.displayName}
						</h3>
						<p className="text-sm text-gray-500">
							{interlocutor.online ? "Connecté" : "Déconnecté"}
						</p>
					</div>
				</div>
				<div className="flex items-center">
					<div
						className="w-[72px] h-8 rounded-full bg-gray-200 p-1 cursor-pointer relative"
						onClick={moveSlider}
					>
						<div
							className={`absolute w-6 h-6 rounded-full shadow ${getSliderColor()} transition-all duration-300 flex items-center justify-center`}
							style={{
								left:
									sliderPosition === 0
										? "3px"
										: sliderPosition === 1
											? "calc(50% - 12px)"
											: "calc(100% - 27px)",
							}}
						>
							<Bot size={14} color="white" />
						</div>
					</div>
				</div>
			</div>

			{/* 2. Zone de messages */}
			<div className="flex-1 flex-col overflow-y-auto custom-scrollbar p-4 bg-snappy-gray bg-[url('/pic5.jpg')] bg-cover bg-center bg-no-repeat">
				{messagesLoading ? (
					<div className="flex flex-col items-center justify-center h-full text-center">
						<Loader2 className="w-8 h-8 text-snappy-purple animate-spin mb-2" />
						<p className="text-gray-500 font-medium">
							Chargement de messages...
						</p>
					</div>
				) : messages && messages.length > 0 ? (
					messages.map((msg) => (
						<div
							key={msg.id}
							className={`mb-4 w-full flex ${msg.sender !== interlocutor.externalId ? "justify-end" : "justify-start"}`}
						>
							<div
								className={`p-3 rounded-lg relative max-w-[45%] ${
									msg.sender !== interlocutor.externalId
										? "bg-snappy-purple text-white rounded-br-none"
										: "bg-white text-gray-800 rounded-bl-none shadow-sm"
								}`}
							>
								<div className="break-words">{msg.body}</div>
								<div
									className={`flex items-center text-xs mt-1 ${
										msg.sender !== interlocutor.externalId
											? "text-white"
											: "text-gray-800"
									}`}
								>
									<MessageAckStatus ack={msg.ack} />
									<span className="ml-1">
										{formatTime(
											msg.updatedAt
												? msg.updatedAt
												: new Date()
										)}
									</span>
									{!msg.writtenByHuman && (
										<span className="ml-1">
											<Bot size={14} />
										</span>
									)}
								</div>
							</div>
						</div>
					))
				) : (
					<div className="flex flex-col items-center justify-center h-full text-center">
						<p className="text-gray-500 font-medium">
							Aucun message à afficher.
						</p>
					</div>
				)}
			</div>

			{/* 3. Zone de saisie */}
			<div
				className="p-4 bg-white relative"
				style={{ borderTop: "1px solid rgba(123, 82, 171, 0.1)" }}
			>
				{/* Sélecteur d'émojis */}
				{showEmojiPicker && (
					<div
						ref={emojiPickerRef}
						className="absolute bottom-20 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 w-80 max-h-64 overflow-hidden"
					>
						<div className="flex border-b border-gray-200 pb-2 mb-2 overflow-x-auto custom-scrollbar">
							{(
								Object.keys(EMOJIS) as Array<
									keyof typeof EMOJIS
								>
							).map((category) => (
								<button
									key={category}
									onClick={() =>
										setActiveEmojiCategory(category)
									}
									className={`px-3 py-1 mr-1 text-xs rounded-full whitespace-nowrap ${
										activeEmojiCategory === category
											? "bg-snappy-purple text-white"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
								>
									{categoryNames[category]}
								</button>
							))}
						</div>
						<div className="overflow-y-auto h-40 custom-scrollbar">
							<div className="grid grid-cols-8 gap-1">
								{EMOJIS[activeEmojiCategory].map(
									(emoji, index) => (
										<button
											key={index}
											onClick={() => insertEmoji(emoji)}
											className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
										>
											{emoji}
										</button>
									)
								)}
							</div>
						</div>
					</div>
				)}

				<div className="flex items-end">
					<button
						className="p-2 text-snappy-purple hover:bg-purple-50 rounded-full"
						onClick={sendFile}
					>
						<PaperclipIcon size={22} />
					</button>
					<div
						className="flex-1 mx-2 border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-300"
						style={{ borderColor: "rgba(123, 82, 171, 0.3)" }}
					>
						<textarea
							className="w-full p-3 outline-none resize-none bg-white text-gray-800 min-h-[44px] max-h-32"
							placeholder="Écrivez un message..."
							value={message}
							disabled={sliderPosition === 2}
							onChange={(e) => setMessage(e.target.value)}
							rows={Math.min(
								4,
								Math.max(1, message.split("\n").length)
							)}
							style={{ lineHeight: "1.1" }}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSendMessage();
								}
							}}
						/>
					</div>
					<button
						className="p-2 text-snappy-purple hover:bg-purple-50 rounded-full mr-1"
						onClick={toggleEmojiPicker}
					>
						<Smile size={22} />
					</button>
					<button
						className={`p-2 rounded-full flex items-center justify-center ${message.trim() ? "bg-snappy-purple text-white" : "bg-gray-200 text-gray-400"}`}
						onClick={handleSendMessage}
						disabled={!message.trim()}
					>
						<Send size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};
