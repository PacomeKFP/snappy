import { View,  StyleSheet,Image,  ImageBackground, ActivityIndicator,Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ThemeText } from '@/components/ThemeText';
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { ThemeTouchableOpacity } from "@/components/ThemeTouchableOpacity";
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { AuthenticationService } from "@/services/authentication-service";
export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [isAuthenticating,setIsAuthentificating] = useState(false)
  const router = useRouter();

  
  
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

      <ThemeTouchableOpacity variant="button"
       onPress={(e) => AuthenticationService.register(email, password,confirm_password,username, router,setIsAuthentificating)}>
        <ThemeText variant="buttonText">S'inscrire</ThemeText>
      </ThemeTouchableOpacity>

      {isAuthenticating && (
              <View>
                <ActivityIndicator size="large" color="#7B52AB" />
                <Text>Chargement...</Text>
              </View>
            )}
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
