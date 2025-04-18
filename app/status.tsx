import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { router } from 'expo-router';
import AddContactScreen from './addContact';
import { useEffect, useState } from 'react';
import { useContacts } from '@/contexts/ContactContext';  

export default function StatusScreen() {
  const { contacts, fetchContacts } = useContacts();  
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  useEffect(() => {
    if (contacts.length === 0) {
      fetchContacts().catch((e) => {
        console.error("Erreur lors du chargement des contacts :", e);
      });
    }
  }, [contacts]);

  const startChat = (name: string, avatar: any) => {
    router.push({ pathname: "/ChatItems", params: { name, avatar } });
  };

  if (contacts.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7B52AB" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={styles.header}>Mes Contacts</Text>

      <FlatList
        data={contacts.filter(c => c != null)} // sécurisation
        keyExtractor={(item) => item?.externalId?.toString() ?? Math.random().toString() }

        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => startChat(item!.displayName!, item.avatar)}
          >
            <Image 
              source={  require('../assets/images/me.jpeg') } 
              style={styles.avatar} 
            />
            <Text style={styles.name}>{item.displayName}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={toggleModal}>
        <Ionicons name="person-add" size={28} color="white" />
      </TouchableOpacity>

      <AddContactScreen visible={isModalVisible} onClose={toggleModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', margin: 16 },
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
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  contactItem: { flexDirection: "row", alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  name: { fontSize: 18, color: "black" },
});
