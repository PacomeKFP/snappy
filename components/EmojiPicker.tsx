import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ScrollView, 
  Animated, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EMOJIS } from '@/constants/emojis';

interface EmojiPickerProps {
  visible: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
}

const { height: screenHeight } = Dimensions.get('window');

const EmojiPicker: React.FC<EmojiPickerProps> = ({ visible, onClose, onEmojiSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof EMOJIS>('smileys');
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  const categoryIcons: { [key in keyof typeof EMOJIS]: string } = {
    smileys: '😀',
    people: '👋',
    animals: '🐶',
    food: '🍎',
    activities: '⚽',
    travel: '✈️',
    objects: '💡',
    symbols: '❤️',
  };

  const categoryNames: { [key in keyof typeof EMOJIS]: string } = {
    smileys: 'Smileys',
    people: 'Personnes',
    animals: 'Animaux',
    food: 'Nourriture',
    activities: 'Activités',
    travel: 'Voyage',
    objects: 'Objets',
    symbols: 'Symboles',
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {categoryIcons[selectedCategory]} {categoryNames[selectedCategory]}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#7B52AB" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.emojiGrid}>
          {EMOJIS[selectedCategory].map((emoji, index) => (
            <TouchableOpacity
              key={`${selectedCategory}-${index}`}
              style={styles.emojiButton}
              onPress={() => onEmojiSelect(emoji)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView 
        horizontal 
        style={styles.categoryContainer} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContent}
      >
        {Object.keys(EMOJIS).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category as keyof typeof EMOJIS)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.categoryEmoji,
              selectedCategory === category && styles.selectedCategoryEmoji
            ]}>
              {categoryIcons[category as keyof typeof EMOJIS]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  pickerContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 12,
  },
  emojiButton: {
    width: '12.5%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 1,
  },
  emoji: {
    fontSize: 26,
  },
  categoryContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
    maxHeight: 60,
  },
  categoryContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: 'transparent',
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategory: {
    backgroundColor: '#E8D5FF',
    shadowColor: '#7B52AB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryEmoji: {
    fontSize: 24,
    opacity: 0.7,
  },
  selectedCategoryEmoji: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
});

export default EmojiPicker;