export const fetchChats = async () => {
    const userChats = await ChatService.getUserChat();
    return userChats;
  };