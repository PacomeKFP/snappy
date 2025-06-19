import React, { useState } from "react";
import { View, TouchableOpacity, Modal, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemeText } from "./ThemeText";

export default function AppMenu() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const showMenu = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const handleMenuOption = (action: () => void) => {
    hideMenu();
    setTimeout(action, 100);
  };

  return (
    <>
      <TouchableOpacity onPress={showMenu}>
        <Ionicons name="ellipsis-vertical" size={24} color="#7B52AB" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="none"
        onRequestClose={hideMenu}
      >
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={hideMenu}
        >
          <Animated.View 
            style={[styles.menuContainer, { opacity: fadeAnim }]}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuOption(() => alert("Nouveau groupe"))}
            >
              <ThemeText style={styles.menuText}>Nouveau groupe</ThemeText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuOption(() => router.push("/settings"))}
            >
              <ThemeText style={styles.menuText}>Paramètres</ThemeText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, styles.lastItem]}
              onPress={() => handleMenuOption(() => router.push("/login"))}
            >
              <ThemeText style={styles.menuText}>Déconnexion</ThemeText>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 15,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    minWidth: 200,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});