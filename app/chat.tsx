import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from '@/components/ThemeText';
import { ThemeTouchableOpacity } from '@/components/ThemeTouchableOpacity';
import {ChatResource} from "@/lib/models";
import {fetchChats} from "../services/subservices/chatFetcher";


export default  function ChatScreen() {
  const [chats, setChats] = useState<ChatResource[]>([]);

  useEffect(() => {
    const loadChats = async () => {
      const fetchedChats = await fetchChats();
      setChats(fetchedChats);
    };
    loadChats();
  }, []);
  
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
        keyExtractor={(item) => item.user?.id  || Math.random().toString()}
        renderItem={({ item }: { item: ChatResource }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => handleChatNavigation(item.user!.displayName! , item.user?.avatar)}>
            
            <Image 
              source={item.user?.avatar ? { uri: item.user.avatar } : require('../assets/images/me.jpeg')} 
              style={styles.avatar} 
            />

            
            <View style={styles.textContainer}>
              <ThemeText variant='titre'>{item.user?.displayName}</ThemeText>
              <ThemeText style={styles.lastMessage} numberOfLines={1}>{item.lastMessage?.body || ''}</ThemeText>
            </View>

            <View style={styles.rightContainer}>
              <ThemeText variant='time' style={styles.time}>{item.lastMessage?.updatedAt?.toLocaleString()}</ThemeText>

              //nombre de message non lu
              {/* {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <ThemeText style={styles.unreadThemeText}>{item.unreadCount}</ThemeText>
                </View>
              )} */}
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

// Removed duplicate ChatScreen function to resolve the error.

