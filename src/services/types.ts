// types.ts
export interface User {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    picture: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    status?: string;
    lastMessage?: string;
    unread?: number;
    isTyping?: boolean;
    messages?: Message[];
  }
  
  export interface Message {
    uuid: string;
    author: string;
    conversation: string;
    content: string;
    isRead: boolean;
    replyTo?: string;
    createdAt: string;
    updatedAt: string;
  }
  

  useEffect(() => {
    const fetchContactsAndMessages = async () => {
      try {
        const response = await fetch('http://localhost:8001/users');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const users: User[] = await response.json();
  
        // Pour chaque utilisateur, récupérer ses messages

        
        const usersWithMessages = await Promise.all(
          users.map(async (user) => {
            try {
              // Récupérer la conversation de l'utilisateur
              const conversationResponse = await fetch(`http://localhost:8001/conversation/users/${user.uuid}`);
              if (!conversationResponse.ok) {
                throw new Error(`Failed to fetch conversation for user ${user.uuid}`);
              }
              const conversation = await conversationResponse.json();
  
              // Récupérer les messages de la conversation
              const messagesResponse = await fetch(`http://localhost:8001/messages?conversation=${conversation.id}&user=${user.uuid}`);
              if (!messagesResponse.ok) {
                throw new Error(`Failed to fetch messages for conversation ${conversation.id}`);
              }
              const messages: Message[] = await messagesResponse.json();
  
              // Retourner l'utilisateur enrichi avec ses messages
              return {
                ...user,
                messages,
              };
            } catch (error) {
              console.error(`Error fetching data for user ${user.uuid}:`, error);
              return {
                ...user,
                messages: [],
              };
            }
          })
        );
  
        setContacts(usersWithMessages);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchContactsAndMessages();
  }, []);
  