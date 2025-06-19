import React, { useEffect, useState, useMemo } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Platform 
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { User } from "@/lib/models/user";
import { fetchUsers } from "@/services/subservices/userFetcher";

export default function NewChat() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Filtrage des utilisateurs basé sur la recherche
  const filteredUsers = useMemo(() => {
    if (!search.trim()) {
      return users;
    }
    
    return users.filter(user => {
      const displayName = user.displayName?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      const query = search.toLowerCase();
      
      return displayName.includes(query) || email.includes(query);
    });
  }, [users, search]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userArray = await fetchUsers();
        setUsers(userArray);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B52AB" />
        <Text style={styles.loadingText}>Chargement des contacts...</Text>
      </View>
    );
  }

  // Démarrer une nouvelle conversation
  const startChat = (name: string, avatar: any) => {
    router.push({ 
      pathname: "/ChatItems", 
      params: { name, avatar } 
    });
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

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="people-outline" size={80} color="#DDD" />
      <Text style={styles.emptyTitle}>
        {search ? 'Aucun contact trouvé' : 'Aucun contact'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {search 
          ? `Aucun résultat pour "${search}"`
          : 'Ajoutez des contacts pour commencer à discuter'
        }
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header avec navigation et titre */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#7B52AB" />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Nouvelle conversation</Text>
          <Text style={styles.headerSubtitle}>
            {filteredUsers.length} contact{filteredUsers.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Barre de recherche améliorée */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <ThemeTextInput
              variant="searchBar"
              placeholder="Rechercher un contact..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
            {search ? (
              <TouchableOpacity 
                onPress={() => setSearch("")} 
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Indicateur de résultats */}
        {search ? (
          <View style={styles.resultIndicator}>
            <Text style={styles.resultText}>
              {filteredUsers.length} résultat{filteredUsers.length !== 1 ? 's' : ''} trouvé{filteredUsers.length !== 1 ? 's' : ''}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Liste des contacts */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item!.externalId!}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => startChat(
              item!.displayName!, 
              isValidUrl(item.avatar)
                ? { uri: item!.avatar! }
                : require('../assets/images/profile.png')
            )}
            activeOpacity={0.7}
          >
            <View style={styles.avatarContainer}>
              <Image 
                source={
                  isValidUrl(item.avatar)
                    ? { uri: item!.avatar! }
                    : require('../assets/images/profile.png')
                } 
                style={styles.avatar} 
              />
              {/* Badge de statut en ligne (optionnel) */}
              <View style={styles.statusBadge} />
            </View>
            
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>
                {search ? 
                  highlightText(item.displayName || '', search) : 
                  item.displayName
                }
              </Text>
              {item.email && (
                <Text style={styles.contactEmail}>
                  {search ? 
                    highlightText(item.email, search) : 
                    item.email
                  }
                </Text>
              )}
            </View>

            <View style={styles.actionContainer}>
              <Ionicons name="chatbubble-outline" size={20} color="#7B52AB" />
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={filteredUsers.length === 0 ? styles.emptyList : styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FAFAFA" 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FAFAFA",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 50 : 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  searchSection: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  searchContainer: {
    marginTop: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: "transparent",
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  resultIndicator: {
    marginTop: 8,
  },
  resultText: {
    fontSize: 14,
    color: "#7B52AB",
    fontWeight: "500",
  },
  list: {
    paddingTop: 8,
  },
  emptyList: {
    flexGrow: 1,
  },
  contactItem: { 
    flexDirection: "row", 
    alignItems: 'center', 
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: { 
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 14,
    color: "#666",
  },
  actionContainer: {
    padding: 8,
  },
  highlightedText: {
    backgroundColor: '#FFE066',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 75,
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
  },
});