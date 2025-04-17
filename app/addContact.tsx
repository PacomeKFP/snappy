import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { ThemeText } from '@/components/ThemeText';
import { ThemeTextInput } from '@/components/ThemeTextInput';
import { ThemeTouchableOpacity } from '@/components/ThemeTouchableOpacity';
import { useContacts } from '@/contexts/ContactContext';  // utilisation du contexte

type CommentModalProps = {
  visible: boolean;
  onClose: () => void;
};

const AddContactScreen: React.FC<CommentModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const { addContact } = useContacts();

  const handleAddContact = async () => {
    if (!email.trim() || !username.trim()) {
      Alert.alert("Champs manquants", "Veuillez remplir l'email et le nom d'utilisateur.");
      return;
    }

    const success = await addContact(email.trim(), username.trim());

    if (success) {
      setEmail('');
      setUsername('');
      onClose();
      Alert.alert("Succès", "Le contact a bien été ajouté !");
    } else {
      Alert.alert("Erreur", "Impossible d'ajouter le contact. Vérifiez les informations.");
    }
  };

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
        <ThemeText variant="titrelogin" style={styles.title}>Ajouter Personne</ThemeText>
        <ThemeTextInput
          variant="input"
          placeholder="leonel.azangue@facscience-uy1.cm"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <ThemeTextInput
          variant="input"
          placeholder="Nom d'utilisateur"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
        <ThemeTouchableOpacity variant="button" onPress={handleAddContact}>
          <ThemeText variant="buttonText">Ajouter</ThemeText>
        </ThemeTouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
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
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});
