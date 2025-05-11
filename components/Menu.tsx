import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { useRouter } from "expo-router";

export default function AppMenu() {
    const router = useRouter();
  return (
    <Menu>
      <MenuTrigger>
        <Ionicons name="ellipsis-vertical" size={24}  color="#7B52AB" />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={{ width: 200, height: 150 }}>
        <MenuOption onSelect={() => alert("Nouveau groupe")} text="Nouveau groupe" 
          customStyles={{
            optionWrapper: { padding: 10 },
            optionText: { fontSize: 18, color: '#333' },
          }}/>
        <MenuOption onSelect={() => router.push("/settings")} text="Paramètres" 
          customStyles={{
            optionWrapper: { padding: 10 },
            optionText: { fontSize: 18, color: '#333' },
          }} />
        <MenuOption onSelect={() => router.push("/login")} text="Déconnexion"
         customStyles={{
          optionWrapper: { padding: 10 },
          optionText: { fontSize: 18, color: '#333' },
        }} />
      </MenuOptions>
    </Menu>
  );
}
