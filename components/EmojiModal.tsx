import { View, StyleSheet } from "react-native";
import Modal from 'react-native-modal';
import { Picker, EmojiData } from "emoji-mart-native";
import { ThemeText } from "@/components/ThemeText";

const EmojiModal: React.FC<{ visible: boolean; onClose: () => void; onEmojiSelect: (emoji: string) => void }> = ({
  visible,
  onClose,
  onEmojiSelect,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={styles.modal}
      propagateSwipe
    >
      <View style={styles.container}>
        <View style={styles.headerBar} />
        <ThemeText variant="titrelogin" style={styles.title}>Sélectionner un emoji</ThemeText>
        <View style={styles.pickerContainer}>
          <Picker
            onEmojiSelect={(emoji: EmojiData) => {
              if (emoji && emoji.native) {
                onEmojiSelect(emoji.native);
                onClose();
              }
            }}
            theme="light"
          />
        </View>
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
    height: "45%",
  },
  pickerContainer: {
    flex: 1,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 8,
  },
  modal: {
    justifyContent: 'flex-end',
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
