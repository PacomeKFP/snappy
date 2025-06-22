import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  Text, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
import * as DocumentPicker from 'expo-document-picker';

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B52AB" />
      </View>
    );
  }

  const handleSendFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled == false) {
        const file = result as DocumentPicker.DocumentPickerResult & { 
          uri: string, 
          name: string, 
          mimeType?: string,
          path?: string 
        };
        console.log('Fichier sélectionné:', file);
        await ChatService.sendMessageWithAttachment(
          file,
          name,
          messages,
          setMessages
        );
      } else {
        console.log('Sélection annulée ou autre');
      }
    } catch (error) {
      console.error('Erreur lors de la sélection du fichier:', error);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      ChatService.sendMessage(newMessage, name, messages, setMessages);
      setNewMessage("");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <ThemeText style={styles.headerText}>{name}</ThemeText>
        <AppSetting />
      </View>

      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={enrichedMessages}
          keyExtractor={(item, index) => item.id ? item.id : `msg-${index}`}
          renderItem={({ item }) => {
            if ('type' in item && item.type === 'separator') {
              return (
                <View style={styles.separatorContainer}>
                  <Text style={styles.separatorText}>{item.label}</Text>
                </View>
              );
            }

            return (
              <View style={[
                styles.messageContainer, 
                item.ack === 'SENT' ? styles.myMessage : styles.otherMessage
              ]}>
                <ThemeText style={styles.messageText}>{item.body}</ThemeText>
                <ThemeText style={styles.timeText}>
                  {item.createdAt ? format(new Date(item.createdAt), 'HH:mm') : ''}
                </ThemeText>
              </View>
            );
          }}
          contentContainerStyle={styles.chatBody}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleSendFile} style={styles.actionButton}>
          <Ionicons name="attach" size={24} color="#7B52AB" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setEmojiVisible(!emojiVisible)} 
          style={styles.actionButton}
        >
          <Ionicons 
            name={emojiVisible ? "chatbubble" : "happy"} 
            size={24} 
            color="#7B52AB" 
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline={true}
          textAlignVertical="center"
          placeholderTextColor="#999"
          maxLength={1000}
        />

        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#7B52AB" />
        </TouchableOpacity>
      </View>

      {emojiVisible && (
        <EmojiPicker
          visible={emojiVisible}
          onClose={() => setEmojiVisible(false)}
          onEmojiSelect={handleEmojiSelect}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F3F3F3"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B52AB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
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
  chatContainer: {
    flex: 1,
  },
  chatBody: {
    padding: 15,
    flexGrow: 1,
  },
  separatorContainer: {
    alignItems: 'center',
    marginVertical: 10
  },
  separatorText: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  messageContainer: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 12,
    marginVertical: 3,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  timeText: {
    color: "#666",
    fontSize: 11,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
  },
  actionButton: {
    padding: 8,
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginHorizontal: 5,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  sendButton: {
    padding: 8,
    marginLeft: 5,
  },
});