import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { useRouter } from "expo-router";

export default function AppSetting() {
    const router = useRouter();
  return (
    <Menu>
      <MenuTrigger>
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => alert("ALAN")} text="Alan" 
           customStyles={{
            optionWrapper: { padding: 10 },
            optionText: { fontSize: 18, color: '#333' },
          }}/>
        <MenuOption onSelect={() => alert("Profil")} text="Paramètres" 
           customStyles={{
            optionWrapper: { padding: 10 },
            optionText: { fontSize: 18, color: '#333' },
          }}/>
        <MenuOption onSelect={() => router.push("/home")} text="Fermer la discussion" 
           customStyles={{
            optionWrapper: { padding: 10 },
            optionText: { fontSize: 18, color: '#333' },
          }}/>
      </MenuOptions>
    </Menu>
  );
}