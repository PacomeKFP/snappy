import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Picker, EmojiData } from "emoji-mart-native";
import { ThemeText } from "@/components/ThemeText";
import { Ionicons } from "@expo/vector-icons";

const EmojiPicker: React.FC<{ visible: boolean; onClose: () => void; onEmojiSelect: (emoji: string) => void }> = ({
  visible,
  onClose,
  onEmojiSelect,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemeText variant="titrelogin" style={styles.title}>Emojis</ThemeText>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#7B52AB" />
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          onEmojiSelect={(emoji: EmojiData) => {
            if (emoji && emoji.native) {
              onEmojiSelect(emoji.native);
            }
          }}
          theme="light"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    height: 250,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  pickerContainer: {
    flex: 1,
  },
});

export default EmojiPicker;
