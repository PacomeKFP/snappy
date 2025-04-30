import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppSetting from "../components/setting";
import { format } from 'date-fns';
import { ThemeText } from '@/components/ThemeText';
import { Message } from "@/lib/models";
import { fetchChatDetails } from "../services/subservices/chatDetailsFetcher";
import { ChatService } from "../services/chat-service";


// Écran de la conversation
export default function ChatRoom() {
  const router = useRouter();
  const { name, avatar } = useLocalSearchParams<{ name: string; avatar: string }>(); // Récupérer les paramètres de navigation
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  //recherche les conversations à chaque fois qu'on entre dans un chat
  useEffect(() => {
    const loadChatDetails = async () => {
      try {
              const chatDetails = await fetchChatDetails(name);
              console.log("response chatDetails : ",chatDetails)
              setMessages(chatDetails);
          } catch (error) {
            console.error("Erreur:", error);
          } finally {
            setLoading(false);
          }
        };
        loadChatDetails();
      }, []);

      if (loading) {
            return <ActivityIndicator size="large"  color="#7B52AB" />;
          }


  const handleSendFile = () => {
    // Fonction pour envoyer un fichier
  };

  const handleSendEmoji = () => {
    // Fonction pour envoyer un émoticône
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
        data={messages}
        keyExtractor={(item) => item.id ||Date.now().toString() + Math.random().toString(36).substr(2, 9)}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.ack === 'SENT' ? styles.myMessage : styles.otherMessage]}>
            <ThemeText style={styles.messageText}>{item.body}</ThemeText>
            <ThemeText style={styles.Time}>{item.createdAt ? format(new Date(item.createdAt), 'HH:mm') : ''}</ThemeText>
          </View>
        )}
        contentContainerStyle={styles.chatBody}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleSendFile}>
          <Ionicons name="attach" size={24} color="#7B52AB" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSendEmoji}>
          <Ionicons name="happy" size={24} color="#7B52AB" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={() => {
           if (newMessage.trim() !== "") {
            ChatService.sendMessage(newMessage, name,messages,setMessages);
            setNewMessage("");
          }
          
        }}>
          <Ionicons name="send" size={24} color="#7B52AB" />
        </TouchableOpacity>
      </View>
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
  headerText: { fontSize: 18, color: "white", fontWeight: "bold", flex: 1 },
  icon: { marginHorizontal: 10 },
  chatBody: { padding: 15, flexGrow: 1 },
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
  messageText: { fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  Time: {
    color: "#423838",
    fontSize: 12,
    alignSelf: "flex-end"
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    marginRight: 10,
  },
});
