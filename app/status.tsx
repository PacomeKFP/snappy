import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { router } from 'expo-router';
import AddContactScreen from './addContact';
import { useEffect, useState } from 'react'; ``
import { User } from "@/lib/models/user";
import { fetchUsers } from "../services/subservices/userFetcher";

export default function StatusScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userArray = await fetchUsers(); // Attend la résolution de la promesse
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
    return <ActivityIndicator size="large" />;
  }

  // Démarrer une nouvelle conversation
  const startChat = (name: string, avatar: any) => {
    router.push({ pathname: "/ChatItems", params: { name, avatar } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Mes Contacts...</Text>

    <FlatList
        data={users}
        keyExtractor={(item) => item?.externalId || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem} onPress={() => startChat(item!.displayName!, item.avatar)}>
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

})