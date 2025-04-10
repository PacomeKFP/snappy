import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert ,ImageBackground} from 'react-native';
import { router } from 'expo-router';
import { ThemeText } from '@/components/ThemeText';
import { ThemeTextInput } from '@/components/ThemeTextInput';
import { ThemeTouchableOpacity } from '@/components/ThemeTouchableOpacity';

export default function AddContactScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');


  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleAddContact = () => {
    if (!username || !email) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }    
    Alert.alert(
      "Confirmation",
      `Voulez-vous ajouter ${email} ?`,
      [

        { text: "Annuler", style: "cancel" },
        { text: "OK", onPress: () => router.push("/home") }
      ]
    );
  };

  const handleCancel = () =>{
    router.push('/home');
  }
  return ( 
        <ImageBackground source={require("../assets/images/me.jpeg")} style={styles.background}>
    
      <View style={styles.container}>
        <View>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        </View>
        <ThemeText variant="titrelogin" style={styles.title}>Ajouter Personne</ThemeText>
        <ThemeTextInput
                variant="input"
          placeholder="leonel.azangue@facscience-uy1.cm"
          placeholderTextColor='gray'
          value={email}
          onChangeText={setEmail}
        />
        <ThemeTextInput
                variant="input"
          placeholder="Nom d'utilisateur"
          placeholderTextColor='gray'
          value={username}
          onChangeText={setUsername}
        />
        <ThemeTouchableOpacity variant="button"onPress={handleAddContact}>
          <ThemeText variant="buttonText">Ajouter</ThemeText>
        </ThemeTouchableOpacity>
            <ThemeTouchableOpacity variant="button" onPress={handleCancel}>
          <ThemeText variant="buttonText">Annuler</ThemeText>
        </ThemeTouchableOpacity>
      </View>
     </ImageBackground>
  );
};


const styles = StyleSheet.create({
 
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    },
  container: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
 logo: {
    width: 120,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 8,
  },

});
