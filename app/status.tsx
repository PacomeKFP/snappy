import { Ionicons } from '@expo/vector-icons';
import { View, Text,StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import AddContactScreen from './addContact';
import { useState } from 'react';``

  export default function StatusScreen() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!isModalVisible);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text>Mes Contacts...</Text>

         <TouchableOpacity style={styles.fab} onPress={toggleModal}>
         <Ionicons name="person-add" size={28} color="white" />
            </TouchableOpacity>
        
          <AddContactScreen  visible={isModalVisible} onClose={toggleModal}/>    
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
  
  
})