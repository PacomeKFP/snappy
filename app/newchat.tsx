import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeTextInput } from "@/components/ThemeTextInput";

// Liste de contacts disponibles
const contacts = [
  { id: "1", name: "Emma", avatar: require("../assets/images/me.jpeg") },
  { id: "2", name: "Liam", avatar: require("../assets/images/me.jpeg") },
  { id: "3", name: "Sophia", avatar: require("../assets/images/me.jpeg") },
];

export default function NewChat() {
  const router = useRouter();
  const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const handleCloseSearch = () => {
      setShowSearch(false);
      setSearch(""); 
    };
  // Démarrer une nouvelle conversation
  const startChat = (name: string, avatar: any) => {
    router.push({ pathname: "/ChatItems", params: { name, avatar } });
  };

  return (
    <View style={styles.container}>
       
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
      <Text style={styles.header}>Nouvelle conversation</Text>
      
              <View style={styles.boxsearch}>
                {showSearch ? (
                  <View style={styles.searchContainer}>
                    <ThemeTextInput 
                     variant="searchBar"
                      placeholder="Rechercher..."
                      value={search}
                      onChangeText={setSearch}
                      autoFocus
                    />
                    <TouchableOpacity onPress={handleCloseSearch}>
                      <Ionicons name="close" size={24} color="#7B52AB" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setShowSearch(true)}>
                    <Ionicons name="search" size={24}  color="#7B52AB" />
                  </TouchableOpacity>
                )}
              </View>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem} onPress={() => startChat(item.name, item.avatar)}>
            <Image source={item.avatar} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 15 },
  nav:{flexDirection: "row"},
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10,   justifyContent: "space-between" ,flexDirection: "row", },
  contactItem: { flexDirection: "row", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  name: { fontSize: 18, color: "black" },
  boxsearch: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eFeFeF",
    borderRadius: 20,
    flex: 1, 
    paddingHorizontal: 10,
  },
});
