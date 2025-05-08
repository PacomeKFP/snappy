import { View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeText } from '@/components/ThemeText';
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { ThemeTouchableOpacity } from "@/components/ThemeTouchableOpacity";

import { AuthenticationService } from "@/services/authentication-service";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticating, setIsAuthentificating] = useState(false)

  const router = useRouter();

  return (
    <ImageBackground source={require("../assets/images/bg.jpeg")} style={styles.background}>
      <View style={styles.container}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <ThemeText variant="titrelogin" style={styles.title}>
          <Icon name="login" size={20} color="purple" /> Connexion
        </ThemeText>

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
        <ThemeTouchableOpacity variant="button"
          onPress={() => AuthenticationService.login(email, password, router, setIsAuthentificating)}>
          <ThemeText variant="buttonText">Se connecter</ThemeText>
        </ThemeTouchableOpacity>
        <Text>
          Vous n'avez pas de compte ?{" "}
          <Link href="../signup" style={styles.linkText}>
            Inscrivez-vous
          </Link>
        </Text>

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
