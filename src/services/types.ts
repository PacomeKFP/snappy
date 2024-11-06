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
  