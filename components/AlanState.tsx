import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TripleRadioButton({ onStateChange }: { onStateChange?: (option: string) => void }) {
  const options = ['Off', 'Listen', 'On'];
  const [selected, setSelected] = useState('Off');

  const handleSelect = (option: string) => {
    setSelected(option);
    if (onStateChange) onStateChange(option);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.option}
          onPress={() => handleSelect(option)}
        >
          <Ionicons
            name={selected === option ? "radio-button-on" : "radio-button-off"}
            size={24}
            color={selected === option ? "green" : "gray"}
          />
          <Text style={[styles.text, selected === option && styles.selectedText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 6,
    fontSize: 16,
    color: "gray",
  },
  selectedText: {
    color: "green",
    fontWeight: "bold",
  },
});
