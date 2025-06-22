import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from '@/components/ThemeText';
import { ThemeTouchableOpacity } from '@/components/ThemeTouchableOpacity';
import { ChatResource } from "@/lib/models";
import { fetchChats } from "../services/subservices/chatFetcher";
import { useFocusEffect } from '@react-navigation/native';
import { useSearch } from './home'; // Import du contexte de recherche

export default function ChatScreen() {
  const [chats, setChats] = useState<ChatResource[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch(); // Utilisation du contexte de recherche

  // Filtrage des chats basé sur la recherche
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) {
      return chats;
    }
    
    return chats.filter(chat => {
      const userName = chat.user?.displayName?.toLowerCase() || '';
      const lastMessage = chat.lastMessage?.body?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      
      return userName.includes(query) || lastMessage.includes(query);
    });
  }, [chats, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      const loadChats = async () => {
        try {
          const fetchedChats = await fetchChats();
          setChats(fetchedChats);
        } catch (error) {
          console.error("Erreur lors la recuperation des UserChats:", error);
        } finally {
          setLoading(false);
        }
      };

      setLoading(true);
      loadChats();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B52AB" />
        <Text style={styles.loadingText}>Chargement des conversations...</Text>
      </View>
    );
  }

  // Fonction pour ouvrir une conversation
  const handleChatNavigation = (name: string, avatar: any) => {
    router.push({
      pathname: "/ChatItems",
      params: { name, avatar },
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 jours
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="chatbubbles-outline" size={80} color="#DDD" />
      <Text style={styles.emptyTitle}>
        {searchQuery ? 'Aucune conversation trouvée' : 'Aucune conversation'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery 
          ? `Aucun résultat pour "${searchQuery}"`
          : 'Commencez une nouvelle conversation'
        }
      </Text>
      {!searchQuery && (
        <TouchableOpacity style={styles.emptyButton} onPress={openNewChat}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.emptyButtonText}>Nouvelle conversation</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <Text key={index} style={styles.highlightedText}>{part}</Text> : 
        part
    );
  };

  return (
    <View style={styles.container}>
      {/* Indicateur de recherche active */}
      {searchQuery ? (
        <View style={styles.searchIndicator}>
          <Ionicons name="search" size={16} color="#7B52AB" />
          <Text style={styles.searchIndicatorText}>
            {filteredChats.length} résultat{filteredChats.length !== 1 ? 's' : ''} pour "{searchQuery}"
          </Text>
        </View>
      ) : null}

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.user!.id!.toString()}
        renderItem={({ item }: { item: ChatResource }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => handleChatNavigation(
              item.user!.displayName!, 
              isValidUrl(item.user?.avatar)
                ? { uri: item.user!.avatar! }
                : '../assets/images/profile.png'
            )}
            activeOpacity={0.7}
          >
            <View style={styles.avatarContainer}>
              <Image
                source={
                  isValidUrl(item.user?.avatar)
                    ? { uri: item.user!.avatar! }
                    : require('../assets/images/profile.png')
                }
                style={styles.avatar}
              />
              {/* Indicateur en ligne (optionnel) */}
              <View style={styles.onlineIndicator} />
            </View>

            <View style={styles.textContainer}>
              <View style={styles.headerRow}>
                <ThemeText variant='titre' style={styles.userName}>
                  {searchQuery ? 
                    highlightText(item.user!.displayName!, searchQuery) : 
                    item.user!.displayName!
                  }
                </ThemeText>
                <ThemeText variant='time' style={styles.time}>
                  {formatTime(item.lastMessage!.updatedAt!)}
                </ThemeText>
              </View>
              
              <View style={styles.messageRow}>
                <ThemeText style={styles.lastMessage} numberOfLines={1}>
                  {searchQuery ? 
                    highlightText(item.lastMessage!.body!, searchQuery) : 
                    item.lastMessage!.body!
                  }
                </ThemeText>
                {/* Badge pour messages non lus (à implémenter) */}
                {/* {item.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unreadCount}</Text>
                  </View>
                )} */}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={filteredChats.length === 0 ? styles.emptyList : styles.list}
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  searchIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#F8F8FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchIndicatorText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7B52AB',
    fontWeight: '500',
  },
  list: {
    paddingTop: 5,
  },
  emptyList: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  highlightedText: {
    backgroundColor: '#FFE066',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 77,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B52AB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  unreadBadge: {
    backgroundColor: '#7B52AB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});