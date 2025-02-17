interface Bot {
    id: string;
    label: string;
    prompt: string;
    description: string;
    languageModel: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
  }

interface CreateBotDto {
    label: string;
    prompt: string;
    description: string;
    languageModel: string;
    projectId: string;
}