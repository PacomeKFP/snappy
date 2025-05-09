import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AppSetting from "../components/setting";
import { format } from 'date-fns';
import { ThemeText } from '@/components/ThemeText';
import { Message } from "@/lib/models";
import { fetchChatDetails } from "../services/subservices/chatDetailsFetcher";
import { ChatService } from "../services/chat-service";
import { SnappySocketClient } from "@/lib/SnappySocketClient";
import { API_SOCKET_URL, PROJECT_ID } from "@/lib/constants";
import { prepareMessagesWithDateSeparators } from '@/lib/utils';
import { Ionicons } from "@expo/vector-icons";
import EmojiPicker from "@/components/EmojiPicker";

export default function ChatRoom() {
  const router = useRouter();
  const { name, avatar } = useLocalSearchParams<{ name: string; avatar: string }>();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const [emojiVisible, setEmojiVisible] = useState(false);

  const enrichedMessages = prepareMessagesWithDateSeparators(messages);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const loadChatDetails = async () => {
      try {
        const chatDetails = await fetchChatDetails(name);
        setMessages(chatDetails);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChatDetails();
  }, []);

  useEffect(() => {
    const setupSocket = async () => {
      const requesterId = await ChatService.getRequesterId();
      const socket = new SnappySocketClient(API_SOCKET_URL, PROJECT_ID, requesterId);
      socket.initialize();
      socket.socket?.on("message-send", (newMessage: Message, messageReceivedCallback: () => void) => {
        ChatService.receiveMessage(name, newMessage, messages, setMessages);
        messageReceivedCallback();
      });
    };

    setupSocket();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#7B52AB" />;
  }

  const handleSendFile = () => {
    // Fonction pour envoyer un fichier
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => {
      const newText = prev + emoji;
      return newText;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <ThemeText style={styles.headerText}>{name}</ThemeText>
        <Ionicons name="call" size={24} color="white" style={styles.icon} />
        <AppSetting />
      </View>

      <FlatList
        ref={flatListRef}
        data={enrichedMessages}
        keyExtractor={(item, index) => item.id ? item.id : `msg-${index}`}
        renderItem={({ item }) => {
          if ('type' in item && item.type === 'separator') {
            return (
              <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 12, color: '#888' }}>{item.label}</Text>
              </View>
            );
          }

          return (
            <View style={[styles.messageContainer, item.ack === 'SENT' ? styles.myMessage : styles.otherMessage]}>
              <ThemeText style={styles.messageText}>{item.body}</ThemeText>
              <ThemeText style={styles.Time}>
                {item.createdAt ? format(new Date(item.createdAt), 'HH:mm') : ''}
              </ThemeText>
            </View>
          );
        }}
        contentContainerStyle={styles.chatBody}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleSendFile}>
          <Ionicons name="attach" size={24} color="#7B52AB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEmojiVisible(!emojiVisible)}>
          <Ionicons name={emojiVisible ? "chatbubble" : "happy"} size={24} color="#7B52AB" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline={true}
          textAlignVertical="center"
          placeholderTextColor="#999"
        />

        <TouchableOpacity onPress={() => {
          if (newMessage.trim() !== "") {
            ChatService.sendMessage(newMessage, name, messages, setMessages);
            setNewMessage("");
          }
        }}>
          <Ionicons name="send" size={24} color="#7B52AB" />
        </TouchableOpacity>
      </View>

      <EmojiPicker
        visible={emojiVisible}
        onClose={() => setEmojiVisible(false)}
        onEmojiSelect={handleEmojiSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B52AB",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    flex: 1
  },
  icon: { marginHorizontal: 10 },
  chatBody: {
    padding: 15,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#EAEAEA",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  Time: {
    color: "#423838",
    fontSize: 12,
    alignSelf: "flex-end"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    marginRight: 10,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
  },
});
