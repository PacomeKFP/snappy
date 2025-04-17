import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import TripleRadioButton from "./AlanState";

export default function AppSetting() {
  const router = useRouter();

  // États possibles et état courant
  const states: ('Off' | 'Listen' | 'On')[] = ['Off', 'Listen', 'On'];
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  // Fonction pour passer à l'état suivant
  const handleTripleStatePress = () => {
    setCurrentStateIndex((currentStateIndex + 1) % states.length);
  };

  return (
    <Menu>
      <MenuTrigger>
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </MenuTrigger>
      <MenuOptions>
       
        <MenuOption
          onSelect={() => alert("Profil")}
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
        {/* Option personnalisée avec le bouton à trois états */}
        <MenuOption
          customStyles={{
            optionWrapper: { padding: 10, justifyContent: 'flex-start' },
            
          }}
          
          
          disabled={true} // désactive la sélection pour éviter conflit
        >
          <TripleRadioButton
            onStateChange={(option) => {
              console.log("Selected state:", option);
              alert(`Selected state: ${option}`);
            }}
          />
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
