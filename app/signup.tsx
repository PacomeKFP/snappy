import { View,  StyleSheet,Image,  ImageBackground } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ThemeText } from '@/components/ThemeText';
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { ThemeTouchableOpacity } from "@/components/ThemeTouchableOpacity";
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const router = useRouter();

      const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
      const projetId =    "81997082-7e88-464a-9af1-b790fdd454f8";
      
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!username || !password || !email||!confirm_password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (!validateEmail(email)) {//verification de l'email
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    if(confirm_password != password){
      alert("mot de passe different, veillez saisir à nouveau votre mot de passe.")
      return;
    }
    try {
    const result = snappy.createUser({
        "projectId":projetId,
        "externalId":"test",
        "avatar":"../assets/images/logo.png",
        "displayName":username,
        "email":email,
        "login":email,
        "secret":password
       })
       console.log(result);

      // Store user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(result));
      router.push("/login"); 
    } catch (error) {
      return;
    }

  };
  
  return (
        <ImageBackground source={require("../assets/images/me.jpeg")} style={styles.background}>
    <View style={styles.container}>
         <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <ThemeText variant="titrelogin" style={styles.title}>Inscription</ThemeText>

      <ThemeTextInput
              variant="input"
        placeholder="Nom d'utilisateur"
          placeholderTextColor='gray'
        value={username}
        onChangeText={setUsername}
      />
      <ThemeTextInput
        variant="input"
        placeholder="Email"
          placeholderTextColor='gray'
        value={email}
        onChangeText={setEmail}
      />
      <ThemeTextInput
        variant="input"
        placeholder="Mot de passe"
          placeholderTextColor='gray'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ThemeTextInput
        variant="input"
        placeholder="Confirmer le Mot de passe"
          placeholderTextColor='gray'
        secureTextEntry
        value={confirm_password}
        onChangeText={setConfirm_Password}
      />

      <ThemeTouchableOpacity variant="button" onPress={handleLogin}>
        <ThemeText variant="buttonText">S'inscrire</ThemeText>
      </ThemeTouchableOpacity>
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
    logo: {
        width: 120,
        height: 100,
        marginBottom: 20,
      },
  container: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
});
