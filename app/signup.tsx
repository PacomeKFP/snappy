import { View, Text, TextInput, StyleSheet,Image, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ThemeText } from '@/components/ThemeText';
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { ThemeTouchableOpacity } from "@/components/ThemeTouchableOpacity";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = () => {
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
    }
    router.push("/login"); 
  };
  
  return (
        <ImageBackground source={require("../assets/images/me.jpeg")} style={styles.background}>
    <View style={styles.container}>
         <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <ThemeText variant="titrelogin" style={styles.title}>Inscription</ThemeText>

      <ThemeTextInput
              variant="input"
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <ThemeTextInput
        variant="input"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <ThemeTextInput
        variant="input"
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ThemeTextInput
        variant="input"
        placeholder="Confirmer le Mot de passe"
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
