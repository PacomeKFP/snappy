import React, { useState, createContext, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
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

        {/* Navigation avec onglets en bas + swipe */}
        <Tab.Navigator
          tabBarPosition="bottom"
          swipeEnabled={true}
          animationEnabled={true}
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: styles.tabIndicator,
            tabBarActiveTintColor: "#7B52AB",
            tabBarInactiveTintColor: "#999",
            tabBarLabelStyle: styles.tabLabel,
            tabBarIconStyle: styles.tabIcon,
            tabBarShowIcon: true,
            tabBarPressColor: 'rgba(123, 82, 171, 0.1)', // Couleur du ripple sur Android
            tabBarPressOpacity: 0.8, // Opacité sur iOS
          }}
        >
          <Tab.Screen 
            name="Chats" 
            component={ChatScreenWrapper}
            options={{
              tabBarLabel: ({ focused, color }) => (
                <View style={styles.tabLabelContainer}>
                  <Ionicons 
                    name={focused ? 'chatbubbles' : 'chatbubbles-outline'} 
                    size={20} 
                    color={color} 
                    style={styles.tabIconStyle}
                  />
                  <Text style={[styles.tabLabelText, { color }]}>Chats</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen 
            name="Contacts" 
            component={StatusScreenWrapper}
            options={{
              tabBarLabel: ({ focused, color }) => (
                <View style={styles.tabLabelContainer}>
                  <Ionicons 
                    name={focused ? 'people' : 'people-outline'} 
                    size={20} 
                    color={color}
                    style={styles.tabIconStyle}
                  />
                  <Text style={[styles.tabLabelText, { color }]}>Contacts</Text>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 12,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1000,
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
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: Platform.OS === 'ios' ? 85 : 90,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    paddingTop: 5,
  },
  tabIndicator: { 
    backgroundColor: "#7B52AB", 
    height: 3,
    borderRadius: 2,
    bottom: Platform.OS === 'ios' ? 25 : 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: 'none',
  },
  tabIcon: {
    marginBottom: 2,
  },
  tabLabelContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabIconStyle: {
    marginBottom: 4,
  },
  tabLabelText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: 'none',
  },
});