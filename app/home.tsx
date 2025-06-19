import React, { useState, createContext, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatScreen from "./chat";
import StatutScreen from "./status";
import { Ionicons } from "@expo/vector-icons";
import AppMenu from "../components/Menu";
import { ThemeTextInput } from "@/components/ThemeTextInput";

const Tab = createMaterialTopTabNavigator();

// Context pour partager la recherche entre home et chat
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
});

export const useSearch = () => useContext(SearchContext);

// Wrapper pour ChatScreen avec contexte
function ChatScreenWrapper() {
  return <ChatScreen />;
}

// Wrapper pour StatusScreen avec contexte  
function StatusScreenWrapper() {
  return <StatutScreen />;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearch("");
  };

  const searchContextValue = {
    searchQuery: search,
    setSearchQuery: setSearch,
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
      <View style={styles.container}>
        {/* En-tête avec titre et barre de recherche */}
        <View style={styles.header}>
          {!showSearch && <Text style={styles.title}>Yow Talk</Text>}
          <View style={styles.boxsearch}>
            {showSearch ? (
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#7B52AB" style={styles.searchIcon} />
                <ThemeTextInput
                  variant="searchBar"
                  placeholder="Rechercher une conversation..."
                  value={search}
                  onChangeText={setSearch}
                  autoFocus
                  style={styles.searchInput}
                />
                <TouchableOpacity onPress={handleCloseSearch} style={styles.closeButton}>
                  <Ionicons name="close" size={20} color="#7B52AB" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setShowSearch(true)} style={styles.searchButton}>
                <Ionicons name="search" size={24} color="#7B52AB" />
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
            tabBarLabelStyle: { fontWeight: "bold", fontSize: 16 },
          }}
        >
          <Tab.Screen 
            name="Chats" 
            component={ChatScreenWrapper}
            options={{
              tabBarLabel: ({ color }) => (
                <View style={styles.tabLabelContainer}>
                  <Ionicons name="chatbubble-outline" size={20} color={color} />
                  <Text style={[styles.tabLabel, { color }]}>Chats</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen 
            name="Contacts" 
            component={StatusScreenWrapper}
            options={{
              tabBarLabel: ({ color }) => (
                <View style={styles.tabLabelContainer}>
                  <Ionicons name="people-outline" size={20} color={color} />
                  <Text style={[styles.tabLabel, { color }]}>Contacts</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </SearchContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  boxsearch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    backgroundColor: "transparent",
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  searchButton: {
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    color: "#7B52AB",
  },
  tabBar: {
    backgroundColor: "#ffffff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabIndicator: { 
    backgroundColor: "#7B52AB", 
    height: 3,
    borderRadius: 2,
  },
  tabLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});