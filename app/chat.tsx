import React, { useState, useCallback } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from '@/components/ThemeText';
import { ThemeTouchableOpacity } from '@/components/ThemeTouchableOpacity';
import { ChatResource } from "@/lib/models";
import { fetchChats } from "../services/subservices/chatFetcher";
import { useFocusEffect } from '@react-navigation/native';



export default function ChatScreen() {
  const [chats, setChats] = useState<ChatResource[]>([]);
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    useCallback(() => {
      const loadChats = async () => {
        try {
          const fetchedChats = await fetchChats();

          // Trier les chats du plus récent au plus ancien
          const sortedChats = fetchedChats.sort((a, b) => {
            const dateA = new Date(a.lastMessage?.updatedAt || 0).getTime();
            const dateB = new Date(b.lastMessage?.updatedAt || 0).getTime();
            return dateB - dateA; // ordre décroissant
          });

          setChats(sortedChats);
        } catch (error) {
          console.error("Erreur lors la recuperation des UserChats:", error);
        } finally {
          setLoading(false);
        }
      };


      setLoading(true); // Remets le loading à true à chaque focus
      loadChats();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#7B52AB" />;
  }

  

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

  function isValidUrl(url?: string): boolean {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }


  return (
    <View style={styles.container}>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.user!.id!.toString()}
        renderItem={({ item }: { item: ChatResource }) => (
          <TouchableOpacity style={styles.chatItem}
            onPress={() => handleChatNavigation(
              item.user!.displayName!, isValidUrl(item.user?.avatar)
              ? { uri: item.user!.avatar! }
              : '../assets/images/profile.png')}>

            <Image
              source={
                isValidUrl(item.user?.avatar)
                  ? { uri: item.user!.avatar! }
                  : require('../assets/images/profile.png')
              }
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <ThemeText variant='titre'>{item.user!.displayName!}</ThemeText>
              <ThemeText style={styles.lastMessage} numberOfLines={1}>{item.lastMessage!.body!}</ThemeText>
            </View>

            <View style={styles.rightContainer}>
              <ThemeText variant='time' style={styles.time}>
                {new Date(item.lastMessage!.updatedAt!).toLocaleDateString()}
              </ThemeText>
              <ThemeText variant='time' style={styles.time}>
                {new Date(item.lastMessage!.updatedAt!).toLocaleTimeString()}
              </ThemeText>

              { /* //nombre de message non lu
               {item.unreadCount > 0 && (
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


