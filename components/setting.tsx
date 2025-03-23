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
        <MenuOption onSelect={() => alert("ALAN")} text="Alan" />
        <MenuOption onSelect={() => alert("Profil")} text="Paramètres" />
        <MenuOption onSelect={() => router.push("/home")} text="Fermer la discussion" />
      </MenuOptions>
    </Menu>
  );
}