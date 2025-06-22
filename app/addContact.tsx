import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert, 
  Modal, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { ThemeText } from '@/components/ThemeText';
import { ThemeTextInput } from '@/components/ThemeTextInput';
import { ThemeTouchableOpacity } from '@/components/ThemeTouchableOpacity';
import { useContacts } from '@/contexts/ContactContext';
import { Ionicons } from '@expo/vector-icons';

type CommentModalProps = {
  visible: boolean;
  onClose: () => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddContactScreen: React.FC<CommentModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT));
  const { addContact } = useContacts();

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
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      // Reset form when modal is completely closed
      setEmail('');
      setUsername('');
    });
  };

  const handleAddContact = async () => {
    if (!email.trim() || !username.trim()) {
      Alert.alert("Champs manquants", "Veuillez remplir l'email et le nom d'utilisateur.");
      return;
    }

    const success = await addContact(email.trim(), username.trim());

    if (success) {
      setEmail('');
      setUsername('');
      handleClose();
      Alert.alert("Succès", "Le contact a bien été ajouté !");
    } else {
      Alert.alert("Erreur", "Impossible d'ajouter le contact. Vérifiez les informations.");
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView 
        style={styles.modalOverlay} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Backdrop */}
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={handleClose}
        />

        {/* Modal Content */}
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <ThemeText variant="titrelogin" style={styles.title}>
              Ajouter un contact
            </ThemeText>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <ThemeText style={styles.label}>Email</ThemeText>
              <ThemeTextInput
                variant="input"
                placeholder="leonel.azangue@facscience-uy1.cm"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemeText style={styles.label}>Nom d'utilisateur</ThemeText>
              <ThemeTextInput
                variant="input"
                placeholder="Nom d'utilisateur"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="words"
                style={styles.input}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={handleClose}
              >
                <ThemeText style={styles.cancelButtonText}>Annuler</ThemeText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.addButton]} 
                onPress={handleAddContact}
              >
                <Ionicons name="person-add" size={20} color="white" style={styles.buttonIcon} />
                <ThemeText style={styles.addButtonText}>Ajouter</ThemeText>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    maxHeight: '80%',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#333',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#7B52AB',
  },
  buttonIcon: {
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});