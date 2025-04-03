import { Ionicons } from '@expo/vector-icons';
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

  const router = useRouter();
  const AddContact = () => {
    router.push("/addContact");
  };
export default function StatusScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text>Mes Contacts...</Text>

         <TouchableOpacity style={styles.fab} onPress={AddContact}>
         <Ionicons name="person-add" size={28} color="white" />
            </TouchableOpacity>
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