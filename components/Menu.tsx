import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { useRouter } from "expo-router";

export default function AppMenu() {
    const router = useRouter();
  return (
    <Menu>
      <MenuTrigger>
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => alert("Nouveau groupe")} text="Nouveau groupe" />
        <MenuOption onSelect={() => alert("Paramètres")} text="Paramètres" />
        <MenuOption onSelect={() => router.push("/login")} text="Déconnexion" />
      </MenuOptions>
    </Menu>
  );
}
