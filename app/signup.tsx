import { View, Text, TextInput, StyleSheet,Image, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const router = useRouter();

  return (
        <ImageBackground source={require("../assets/images/me.jpeg")} style={styles.background}>
    <View style={styles.container}>
         <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le Mot de passe"
        secureTextEntry
        value={confirm_password}
        onChangeText={setConfirm_Password}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    borderRadius: 60,
    backgroundColor: "blue",
    margin: 10,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
