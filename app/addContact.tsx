import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from "expo-router";

export default function AddContactScreen() {
  const router = useRouter();

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

 const handleCancel = () => {
    router.push("/home");
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        </View>
        <Text style={styles.title}>Ajouter Personne</Text>
        <TextInput
          style={styles.input}
          placeholder="leonel.azangue@facscience-uy1.cm"
          placeholderTextColor='gray'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          placeholderTextColor='gray'
          value={username}
          onChangeText={setUsername}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleAddContact}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
 
  background: {
    flex: 1,
    backgroundColor: "#7B52AB",
    // resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
     height:"50%",
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
  input: {
    width: '100%',
    color:"black",
    height: 50,
  
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor:'#ddd'
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6A0DAD',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
