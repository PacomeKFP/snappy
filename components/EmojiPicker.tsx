import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EMOJIS } from '@/constants/emojis';

interface EmojiPickerProps {
  visible: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ visible, onClose, onEmojiSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof EMOJIS>('smileys');

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emojis</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#7B52AB" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.pickerContainer}>
        <View style={styles.emojiGrid}>
          {EMOJIS[selectedCategory].map((emoji, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emojiButton}
              onPress={() => onEmojiSelect(emoji)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal style={styles.categoryContainer} showsHorizontalScrollIndicator={false}>
        {Object.keys(EMOJIS).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category as keyof typeof EMOJIS)}
          >
            <Text style={styles.categoryEmoji}>{EMOJIS[category as keyof typeof EMOJIS][0]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 260,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B52AB',
  },
  closeButton: {
    padding: 4,
  },
  pickerContainer: {
    flex: 1,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  emojiButton: {
    width: '12.5%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
    padding: 1,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    height: 0.2,
  },
  categoryButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#F0E6FF',
  },
  categoryEmoji: {
    fontSize: 20,
  },
});

export default EmojiPicker;
