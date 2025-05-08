import { Modal, View, StyleSheet } from "react-native";
import { Picker, EmojiData } from "emoji-mart-native";
import { ThemeText } from "@/components/ThemeText";

const EmojiModal: React.FC<{ visible: boolean; onClose: () => void; onEmojiSelect: (emoji: string) => void }> = ({
  visible,
  onClose,
  onEmojiSelect,
}) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.container}>
        <View style={styles.headerBar} />
        <ThemeText variant="titrelogin" style={styles.title}>Sélectionner un emoji</ThemeText>
        <Picker
          onEmojiSelect={(emoji: EmojiData) => {
            onEmojiSelect(emoji.native); // Passer l'emoji sélectionné à la fonction de rappel
            onClose(); // Fermer le modal après sélection
          }}
          theme="light"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 8,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  headerBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default EmojiModal;
