import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import { View } from "react-native";
import TripleStateButton from "./AlanState"; // ou "./TripleStateButton"

export default function AppSetting() {
  const router = useRouter();

  return (
    <Menu>
      <MenuTrigger>
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </MenuTrigger>

      <MenuOptions>
        <MenuOption
          onSelect={() => router.push("/settingItems")}
          text="Paramètres"
          customStyles={{
            optionWrapper: { padding: 10 },
            optionText: { fontSize: 18, color: '#333' },
          }}
        />

        <MenuOption
          onSelect={() => router.push("/home")}
          text="Fermer la discussion"
          customStyles={{
            optionWrapper: { padding: 10 },
            optionText: { fontSize: 18, color: '#333' },
          }}
        />

        {/* TripleStateButton sans bouton Valider */}
        <MenuOption
          disabled={true}
          customStyles={{
            optionWrapper: {
              padding: 10,
              alignItems: 'flex-start',
            },
          }}
        >
          <View>
            <TripleStateButton
              onStateChange={(newState) => {
                console.log("Nouvel état sélectionné :", newState);
                alert(`État sélectionné : ${newState}`);
              }}
            />
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
