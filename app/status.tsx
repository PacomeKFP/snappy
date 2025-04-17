import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { router } from 'expo-router';
import AddContactScreen from './addContact';
import { useState } from 'react';
import { useContacts } from '@/contexts/ContactContext';  

export default function StatusScreen() {
  const { contacts, fetchContacts } = useContacts();  // récupération des données via contexte
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  // Charger les contacts quand le screen s'ouvre.
  // L'avantage c'est que si le context les avait déjà chargés (ex: dans une autre page), ça évite un rechargement inutile.
  if (!contacts.length) {
    fetchContacts();  // Déclenche le chargement si la liste est vide.
    return <ActivityIndicator size="large" />;
  }

  const startChat = (name: string, avatar: any) => {
    router.push({ pathname: "/ChatItems", params: { name, avatar } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Mes Contacts...</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item?.externalId || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => startChat(item!.displayName!, item.avatar)}
          >
            <Image source={require('../assets/images/me.jpeg')} style={styles.avatar} />
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
  contactItem: { flexDirection: "row", paddingVertical: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  name: { fontSize: 18, color: "black" },
});
