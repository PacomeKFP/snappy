import { Ionicons } from '@expo/vector-icons';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  Image 
} from 'react-native';
import { router } from 'expo-router';
import AddContactScreen from './addContact';
import { useEffect, useState, useMemo } from 'react';
import { useContacts } from '@/contexts/ContactContext';  
import { SnappySocketClient } from "@/lib/SnappySocketClient";
import { API_URL, PROJECT_ID } from "@/lib/constants";
import { useSearch } from './home'; // Import du contexte de recherche

export default function StatusScreen() {
  const { contacts, fetchContacts } = useContacts();  
  const [isModalVisible, setModalVisible] = useState(false);
  const { searchQuery } = useSearch(); // Utilisation du contexte de recherche

  // Filtrage des contacts basé sur la recherche
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) {
      return contacts;
    }
    
    return contacts.filter(contact => {
      const displayName = contact?.displayName?.toLowerCase() || '';
      const email = contact?.email?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      
      return displayName.includes(query) || email.includes(query);
    });
  }, [contacts, searchQuery]);

  const toggleModal = () => setModalVisible(!isModalVisible);

  useEffect(() => {
    if (contacts.length === 0) {
      fetchContacts().catch((e) => {
        console.error("Erreur lors du chargement des contacts :", e);
      });
    }
  }, [contacts]);

  const startChat = (name: string, avatar: any) => {
    const socket = new SnappySocketClient(API_URL, PROJECT_ID, name);
    socket.onConnect();
    router.push({ pathname: "/ChatItems", params: { name, avatar } });
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
        {searchQuery ? 'Aucun contact trouvé' : 'Aucun contact'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery 
          ? `Aucun résultat pour "${searchQuery}"`
          : 'Ajoutez des contacts pour commencer'
        }
      </Text>
      {!searchQuery && (
        <TouchableOpacity style={styles.emptyButton} onPress={toggleModal}>
          <Ionicons name="person-add" size={24} color="white" />
          <Text style={styles.emptyButtonText}>Ajouter un contact</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (contacts.length === 0 && !searchQuery) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7B52AB" />
          <Text style={styles.loadingText}>Chargement des contacts...</Text>
        </View>

        <TouchableOpacity style={styles.fab} onPress={toggleModal}>
          <Ionicons name="person-add" size={28} color="white" />
        </TouchableOpacity>

        <AddContactScreen visible={isModalVisible} onClose={toggleModal} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Indicateur de recherche active */}
      {searchQuery ? (
        <View style={styles.searchIndicator}>
          <Ionicons name="search" size={16} color="#7B52AB" />
          <Text style={styles.searchIndicatorText}>
            {filteredContacts.length} résultat{filteredContacts.length !== 1 ? 's' : ''} pour "{searchQuery}"
          </Text>
        </View>
      ) : (
        <View style={styles.headerSection}>
          <Text style={styles.header}>Mes Contacts</Text>
          <Text style={styles.subHeader}>
            {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      <FlatList
        data={filteredContacts.filter(c => c != null)}
        keyExtractor={(item) => item?.externalId?.toString() ?? Math.random().toString()}
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
              {/* Indicateur de statut en ligne */}
              <View style={styles.onlineIndicator} />
            </View>
            
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>
                {searchQuery ? 
                  highlightText(item.displayName || '', searchQuery) : 
                  item.displayName
                }
              </Text>
              {item.email && (
                <Text style={styles.contactEmail}>
                  {searchQuery ? 
                    highlightText(item.email, searchQuery) : 
                    item.email
                  }
                </Text>
              )}
              <Text style={styles.contactStatus}>
                {item.online ? 'En ligne' : 'Hors ligne'}
              </Text>
            </View>

            <View style={styles.actionContainer}>
              <Ionicons name="chatbubble-outline" size={20} color="#7B52AB" />
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={filteredContacts.length === 0 ? styles.emptyList : styles.list}
      />

      <TouchableOpacity style={styles.fab} onPress={toggleModal}>
        <Ionicons name="person-add" size={28} color="white" />
      </TouchableOpacity>

      <AddContactScreen visible={isModalVisible} onClose={toggleModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
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
  headerSection: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  list: {
    paddingTop: 5,
  },
  emptyList: {
    flexGrow: 1,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#7B52AB",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
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
  contactItem: { 
    flexDirection: "row", 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 15,
    backgroundColor: 'white',
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
    marginBottom: 2,
  },
  contactStatus: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
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
});