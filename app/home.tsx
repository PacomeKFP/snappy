import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatScreen from "./chat";
import StatutScreen from "./status";
import { Ionicons } from "@expo/vector-icons";
import AppMenu from "../components/Menu";
import { ThemeTextInput } from "@/components/ThemeTextInput";

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearch(""); 
  };

  return (
    <View style={styles.container}>
      {/* En-tête avec titre et barre de recherche */}
      <View style={styles.header}>
        {!showSearch && <Text style={styles.title}>Yow Talk</Text>}
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
          <AppMenu />
        </View>
      </View>

      {/* Navigation */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabIndicator,
          tabBarActiveTintColor: "#7B52AB",
          tabBarInactiveTintColor: "#555", 
          tabBarLabelStyle: { fontWeight: "bold" }, 
        }}
      >
        <Tab.Screen name="Chats" component={ChatScreen} />
        <Tab.Screen name="Contacts" component={StatutScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "while",
  },
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
  title: {
    fontSize: 20,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    color: "#7B52AB",
  },
  tabBar: {
    backgroundColor: "#ffffff",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
   
  },
  tabIndicator: { backgroundColor: "#7B52AB", height: 3 },
});
