"use client";

import { bearer } from "@/types/headers";

// Modèles
import { GetChatDetailsDto } from "@/lib/models";
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { ChatDetailsResource, ChatResource } from "@/lib/models";

// CONSTANTES
const basePath = "http://88.198.150.195:8613";
export const projectID = "81997082-7e88-464a-9af1-b790fdd454f8";
export const externalID = "8c375c66-8f32-4122-91cc-bca69f8951a9"; // Pacome • "4482f030-bbfe-4d2d-8375-68b93e1212e6"; // Pio

// --- Méthodes du SDK
export const getUserChatsData = async (): Promise<ChatResource[]> => {
	try {
		const httpClient = new SnappyHTTPClient(basePath, bearer, projectID);
		const data = await httpClient.getUserChats(externalID, projectID);

		return data;

	} catch (error) {
		console.log("Erreur lors de getUserChats-mockDatas: ", JSON.stringify(error));
		return [];
	}
};
// ---

// ---
export const getChatDetailsData = async (getChatDetailsDto: GetChatDetailsDto): Promise<ChatDetailsResource> => {
	try {
		const httpClient = new SnappyHTTPClient(basePath, bearer, projectID);
		const data = await httpClient.getChatDetails(getChatDetailsDto);

		return data;

	} catch (error) {
		console.log(
			"Erreur lors de getChatDetails-mockDatas: ",
			JSON.stringify(error)
		);
		return {} as ChatDetailsResource;
	}
};
// ---