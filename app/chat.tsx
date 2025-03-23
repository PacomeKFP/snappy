import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";



// Liste des conversations
const chats = [
  { id: '1', name: 'Alice', lastMessage: 'Salut, comment ça va ?', avatar: require('../assets/images/me.jpeg'), time: '14:30', unreadCount: 3 },
  { id: '2', name: 'Bob', lastMessage: 'Tu es dispo ce soir ?', avatar: require('../assets/images/me.jpeg'), time: '12:30', unreadCount: 0 },
  { id: '3', name: 'Oscar', lastMessage: 'Calcio demain ?', avatar: require('../assets/images/me.jpeg'), time: '19:30', unreadCount: 1 },
];

export default function ChatScreen() {
  // Fonction pour ouvrir une conversation
  const handleChatNavigation = (name: string, avatar: any) => {
    router.push({
      pathname: "/ChatItems",
      params: { name, avatar }, // Passer le nom et l'avatar au chat
    });
  };
  const openNewChat = () => {
    router.push("/newchat");
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => handleChatNavigation(item.name, item.avatar)}>
            {/* 🔥 Avatar */}
            <Image source={item.avatar} style={styles.avatar} />

            {/* 🔥 Infos du chat */}
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
            </View>

            {/* 🔥 Heure et badge de notification */}
            <View style={styles.rightContainer}>
              <Text style={styles.time}>{item.time}</Text>
              {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
            {/* 🔥 Bouton flottant pour ajouter une conversation */}
            <TouchableOpacity style={styles.fab} onPress={openNewChat}>
        <Ionicons name="chatbubble-ellipses" size={28} color="white" />
      </TouchableOpacity>

    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "while",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4B0082',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  lastMessage: {
    color: 'gray',
    maxWidth: '90%',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  time: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: '#6A0DAD',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  fab: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "#7B52AB",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

});

