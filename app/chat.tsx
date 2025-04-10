import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from '@/components/ThemeText';
import { ThemeTouchableOpacity } from '@/components/ThemeTouchableOpacity';



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
            
            <Image source={item.avatar} style={styles.avatar} />

            
            <View style={styles.textContainer}>
              <ThemeText variant='titre'>{item.name}</ThemeText>
              <ThemeText style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</ThemeText>
            </View>

            <View style={styles.rightContainer}>
              <ThemeText variant='time' style={styles.time}>{item.time}</ThemeText>
              {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <ThemeText style={styles.unreadThemeText}>{item.unreadCount}</ThemeText>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
     
      <ThemeTouchableOpacity variant="fab" onPress={openNewChat}>
        <Ionicons name="chatbubble-ellipses" size={28} color="white" />
      </ThemeTouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
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
  unreadThemeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },

});

