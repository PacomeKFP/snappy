/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, {useState, useEffect} from 'react';
import {
    FaUser, FaSearch, FaPlusCircle, FaEllipsisV, FaCircle,
    FaBell, FaMoon, FaSun, FaLock, FaImage, FaUsers, FaCog
} from 'react-icons/fa';
import bg_login from '@/assets/bg_login.jpg';

interface User {
    uuid: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    picture: string;
    bio: string;
    messages: Message[];
    createdat: string;
    updatedat: string;
}


interface Message {
    uuid: string;
    author: string;
    conversation: string;
    content: string;
    isRead: boolean;
    replyTo: string | null;
    createdat: string | null;
    updatedat: string | null;
}

interface Conversation {
    uuid: string;
    users: string[]; // Liste des UUID des utilisateurs dans la conversation
}

const Chat_initiate: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [message, setMessage] = useState([]);
    const [users, setUsers] = useState<User[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userId = '1a2b3c4d-5678-9101-1121-314151617181'; // ID utilisateur connecté.

    const limitWord = function( inputWord: string,limit: number) {
        if (inputWord.length > limit) {
            return `${inputWord.slice(0, limit)}...`;
        } else {
            return inputWord;
        }
    }
    useEffect(() => {
        const fetchConversationsAndData = async () => {
            try {

                // Récupérer les conversations
                const conversationsResponse = await fetch(`http://localhost:8001/conversations/users?userUid=${userId}`);
                if (!conversationsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${conversationsResponse.status}`);
                }
                const conversations: Conversation[] = await conversationsResponse.json();

                setConversations(conversations);

                // Récupérer les utilisateurs uniques
                const userIds = Array.from(
                    new Set(
                        conversations.flatMap((conversation) =>
                            conversation.users.filter((user) => user !== userId)
                        )
                    )
                );
                const usersWithMessages = await Promise.all(
                    userIds.map(async (id) => {
                        // Récupérer les informations de l'utilisateur
                        const userResponse = await fetch(`http://localhost:8001/users/${id}`);
                        const userData: User = await userResponse.json();
                        // Récupérer les messages associés à l'utilisateur pour chaque conversation
                        const userMessages: Message[] = [];
                        for (const conversation of conversations) {
                            if (!conversation.users.includes(id)) {
                                continue;
                            }
                            const messagesResponse = await fetch(
                                `http://localhost:8001/messages/conversation?conversationUuid=${conversation.uuid}`
                            );
                            if (messagesResponse.ok) {
                                const messages: Message [] = await messagesResponse.json();
                                userMessages.push(...messages);
                            }
                        }
                        return {...userData, messages: userMessages};
                    })
                );

                setUsers(usersWithMessages);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchConversationsAndData();
    }, []);



    const theme = {
        bg: isDarkMode ? '#171717' : '#ffffff',
        text: isDarkMode ? '#ffffff' : '#171717',
        primary: '#247EE4',
        secondary: isDarkMode ? '#322F44' : '#D9D9D9',
        hover: isDarkMode ? '#2a2a2a' : '#f5f5f5',
        border: isDarkMode ? '#333333' : '#D9D9D9',
    };

    const handleMoreOptionsToggle = () => {
        setShowMoreOptions(!showMoreOptions);
    };

    const sendMessage = () => {
        if (newMessage.trim() === '') return;

        const currentUser = users.find(c => c.uuid === selectedUser);
        if (currentUser) {
            const newMessageObj: Message = {
                uuid: (currentUser.messages?.length || 0) + 1,
                content: newMessage,
                author: userId,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            };

            const updatedUsers = users.map(user => {
                if (user.uuid === selectedUser) {
                    return {
                        ...user,
                        lastMessage: newMessage,
                        messages: [...(user.messages || []), newMessageObj]
                    };
                }
                return user;
            });

            setUsers(updatedUsers);
            setNewMessage('');
        }
    };

    const renderMoreOptionsMenu = () => {
        if (!showMoreOptions) return null;

        return (
            <div
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
                style={{
                    background: theme.bg,
                    color: theme.text,
                    border: `1px solid ${theme.border}`
                }}
            >
                <div
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer group transition-colors"
                    style={{
                        backgroundColor: theme.hover
                    }}
                >
                    <FaPlusCircle className="mr-3 text-[#247EE4] group-hover:scale-110 transition-transform"/>
                    <div>
                        <span className="font-semibold">Add a discussion</span>
                        <p className="text-xs text-gray-500">Start a new conversation</p>
                    </div>
                </div>
                <div
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer group transition-colors"
                    style={{
                        backgroundColor: theme.hover
                    }}
                >
                    <FaUsers className="mr-3 text-[#247EE4] group-hover:scale-110 transition-transform"/>
                    <div>
                        <span className="font-semibold">Create a group</span>
                        <p className="text-xs text-gray-500">Invite multiple people</p>
                    </div>
                </div>
                <div
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer group transition-colors"
                    style={{
                        backgroundColor: theme.hover
                    }}
                >
                    <FaCog className="mr-3 text-[#247EE4] group-hover:scale-110 transition-transform"/>
                    <div>
                        <span className="font-semibold">Settings</span>
                        <p className="text-xs text-gray-500">Configure your account</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderChatArea = (user: User) => {
        return (
            <div className="h-full flex flex-col">
                {/* Chat Header */}
                <div
                    className="h-16 px-4 flex items-center justify-between"
                    style={{
                        background: 'linear-gradient(135deg, #247EE4, #0069E0, #322F44)',
                        opacity: isDarkMode ? 0.8 : 1
                    }}
                >
                    <div className="flex items-center gap-4">
                        <FaUser className="w-10 h-10 rounded-full bg-white/90 p-2 text-[#247EE4]"/>
                        <div>
                            <h3 className="text-white font-semibold">{user.name}</h3>
                            <span className="text-xs text-white/80">{user.bio}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-white relative">
                        <FaSearch className="w-5 h-5 cursor-pointer hover:text-white/80"/>
                        <FaImage className="w-5 h-5 cursor-pointer hover:text-white/80"/>
                        <div className="relative">
                            <FaEllipsisV
                                className="w-5 h-5 cursor-pointer hover:text-white/80"
                                onClick={handleMoreOptionsToggle}
                            />
                            {renderMoreOptionsMenu()}
                        </div>
                    </div>
                </div>

                {/* Chat Messages Area */}
                <div
                    className="flex-1 p-6 overflow-y-auto"
                    style={{
                        background: isDarkMode ? '#1a1a1a' : '#f0f2f5',
                        backgroundImage: `url(${bg_login.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: isDarkMode ? 0.9 : 1
                    }}
                >
                    {user.messages?.map((message) => (
                        <div
                            key={message.uuid}
                            className={`flex mb-4 ${message.author === userId ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`p-3 rounded-xl max-w-[70%] ${
                                    message.author === userId
                                        ? 'bg-[#247EE4] text-white'
                                        : 'bg-white text-black shadow-md'
                                }`}
                            >
                                {message.content}
                                <div className="text-xs mt-1 opacity-70 text-right">{message.createdat}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-xl"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                        className="bg-[#247EE4] text-white p-2 rounded-full"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`flex h-screen transition-colors duration-300 ease-in-out`}
            style={{background: theme.bg}}
        >
            {/* Left Sidebar */}
            <div
                className="w-[400px] flex flex-col border-r transition-all duration-300"
                style={{borderColor: theme.border}}
            >
                {/* Header */}
                <div className="h-16 relative overflow-hidden">
                    <div className="absolute inset-0"
                         style={{
                             background: 'linear-gradient(135deg, #247EE4, #0069E0, #322F44)',
                             opacity: isDarkMode ? 0.8 : 1
                         }}
                    />
                    <div className="relative h-full flex items-center justify-between px-4">
                        <div className="flex items-center gap-4">
                            <FaUser className="w-10 h-10 rounded-full bg-white/90 p-2 text-[#247EE4]"/>
                            <span className="text-white font-semibold">My Profile</span>
                        </div>
                        <div className="flex items-center space-x-4 text-white">
                            <FaBell className="w-6 h-6 cursor-pointer hover:text-white/80 transition-colors"/>
                            <div onClick={() => setIsDarkMode(!isDarkMode)} className="cursor-pointer">
                                {isDarkMode ? (
                                    <FaSun className="w-6 h-6 hover:text-white/80 transition-colors"/>
                                ) : (
                                    <FaMoon className="w-6 h-6 hover:text-white/80 transition-colors"/>
                                )}
                            </div>
                            <FaEllipsisV className="w-6 h-6 cursor-pointer hover:text-white/80 transition-colors"/>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="px-4 py-3" style={{background: theme.bg}}>
                    <div className="relative group bg-[#ffffff]">
                        <input
                            type="text"
                            placeholder="Search a new discussion..."
                            className="w-full bg-[#ffffff] py-2.5 pl-10 pr-4 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-[#247EE4]"
                            style={{
                                background: theme.secondary,
                                color: theme.text,
                                border: 'none',
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch
                            className="absolute left-3 top-3 text-[#322F44] group-focus-within:text-[#247EE4] transition-colors"/>
                    </div>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto">
                    {users
                        .filter(user =>
                            user.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((user) => (
                            <div
                                key={user.uuid}
                                className={`flex items-center p-4 cursor-pointer transition-all duration-300 relative ${
                                    selectedUser === user.uuid ? 'bg-[#f0f0f0]' : ''
                                }`}
                                onClick={() => {
                                    setSelectedUser(user.uuid);
                                    setShowMoreOptions(false);
                                }}
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                        <FaUser
                                            className="w-full h-full p-2"
                                            style={{
                                                background: theme.secondary,
                                                color: theme.primary
                                            }}
                                        />
                                    </div>
                                    {/*user.status === 'online'*/ true && (
                                        <FaCircle className="absolute bottom-0 right-0 text-[#14F400] text-xs"/>
                                    )}
                                </div>
                                <div className="flex-1 ml-4">
                                    <div className="flex justify-between items-center">
                                        <h3
                                            className="font-semibold transition-colors"
                                            style={{color: theme.text}}
                                        >
                                            {user.name}
                                        </h3>
                                        <span className="text-xs" style={{color: theme.secondary}}>
                      {user.createdat}
                    </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {user.isTyping ? (
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm text-[#247EE4]">typing</span>
                                            </div>
                                        ) : (
                                            <p className="text-sm truncate" style={{color: theme.secondary}}>
                                                 {limitWord(user.messages[user.messages.length - 1]?.content,20)}
                                            </p>
                                        )}
                                        {user.messages[user.messages.length - 1]?.isRead == false && (
                                            <span
                                                className="bg-[#247EE4] text-white rounded-full px-2 py-1 text-xs animate-pulse">
                                        {limitWord(user.messages[user.messages.length - 1]?.content,10)}
                                        </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>


            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    renderChatArea(users.find(c => c.uuid === selectedUser)!)
                ) : (
                    <div
                        className="flex-1 flex flex-col items-center justify-center p-8"
                        style={{
                            backgroundImage: `url(${bg_login.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: isDarkMode ? 0.9 : 1
                        }}
                    >
                        <div className="text-center max-w-md backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-lg">
                            <div className="mb-6 text-center">
                                <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#247EE4] to-[#0069E0] text-transparent bg-clip-text">
                                    Snappy
                                </h1>
                                <div className="flex items-center justify-center gap-2 text-[#247EE4]">
                                    <FaLock className="w-4 h-4"/>
                                    <span className="text-sm">Chiffrement de bout en bout</span>
                                </div>
                            </div>
                            <p className="text-[#171717] mb-8 leading-relaxed" style={{color: theme.text}}>
                                welcome to Snappy connect with friends and colleagues either for friendly conversations
                                or for Business Group meetings
                            </p>
                            <button
                                className="bg-[#247EE4] text-white px-8 py-3 rounded-xl hover:bg-[#0069E0] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                onClick={() => setSelectedUser(users[0].uuid)}
                            >
                                Start a discussion
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat_initiate;

