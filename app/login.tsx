import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeText } from '@/components/ThemeText';
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { ThemeTouchableOpacity } from "@/components/ThemeTouchableOpacity";

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { SnappyHTTPClient } from "../lib/SnappyHTTPClient";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  // Validate email format
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Handle login
  const handleLogin =  () => {
    if (!username || !password || !email) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    try {
      // Connect to the server
      const snappy = new SnappyHTTPClient("http://88.198.150.195:8613");
      const projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

      // Authenticate user
      const result =  snappy.authenticateUser({
        projectId,
        login: email,
        secret: password,
      });

      if (result instanceof Promise){
        console.log("Promise")
      }else
        console.log("Object")
      // Check if authentication was successful
      if (result && !result.error) {
        console.log("Authentication successful:", result);

        // Store user data in AsyncStorage
        //AsyncStorage.setItem('user', JSON.stringify(result));

        // Redirect to Home page
        router.push("/home");
      } else {
        alert("Échec de l'authentification : " + (result.error || "Erreur inconnue"));
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <ImageBackground source={require("../assets/images/me.jpeg")} style={styles.background}>
      <View style={styles.container}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <ThemeText variant="titrelogin" style={styles.title}>
          <Icon name="login" size={20} color="purple" /> Connexion
        </ThemeText>
        <ThemeTextInput
          variant="input"
          placeholder="Nom d'utilisateur"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
        <ThemeTextInput
          variant="input"
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <ThemeTextInput
          variant="input"
          placeholder="Mot de passe"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <ThemeTouchableOpacity variant="button" onPress={handleLogin}>
          <ThemeText variant="buttonText">Se connecter</ThemeText>
        </ThemeTouchableOpacity>
        <Text>
          Vous n'avez pas de compte ?{" "}
          <Link href="../signup" style={styles.linkText}>
            Inscrivez-vous
          </Link>
        </Text>
      </View>
    </ImageBackground>
  );
}


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
  },


  linkText: {
    marginTop: 10,
    color: "#7B52AB",
    fontWeight: "bold",
    fontSize: 14,
  },
  
});
