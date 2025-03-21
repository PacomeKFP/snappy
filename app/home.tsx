import React, { useState } from "react";
import { Text,View, TextInput, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatScreen from "./chat";
import StatutScreen from "./status";
import CallsScreen from "./call";
import { Ionicons } from "@expo/vector-icons";
import AppMenu from "../components/Menu"; // Import du menu

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      {/* 🔍 Barre de recherche + Menu */}
      <View style={styles.header}>
        <Text style={styles.title}>Yow Talk</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher..."
          value={search}
          onChangeText={setSearch}
        />
        <AppMenu /> {/* 3 points pour ouvrir le menu */}
      </View>

      {/*  Navigation entre Chat, Statuts, Appels */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabIndicator,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#ccc",
        }}
      >
        <Tab.Screen name="Chats" component={ChatScreen} />
        <Tab.Screen name="Statuts" component={StatutScreen} />
        <Tab.Screen name="Appels" component={CallsScreen} />
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
    backgroundColor: "#7B52AB",
  },
  searchBar: {
    flex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  title:{
    fontSize:20,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    color:'white',
    margin:5,
  },
  tabBar: {
    backgroundColor: "#7B52AB",
    position: "absolute",
    bottom: 0, // Barre en bas
    left: 0,
    right: 0,
    height: 60,
  },
  tabIndicator: { backgroundColor: "#fff", height: 3 },
});
