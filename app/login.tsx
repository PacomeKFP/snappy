import { View, Text, TextInput, Button, StyleSheet,Image, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = () => {
    if (!username || !password || !email) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (!validateEmail(email)) {//verification de l'email
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    router.push("/home"); // Redirection vers Home après connexion
  };
  return (
    <ImageBackground source={require("../assets/images/me.jpeg")} style={styles.background}>
     <View style={styles.container}>
    <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>  <Icon name="login" size={20} color="purple" /> Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
         placeholderTextColor='gray'
        value={username}
        onChangeText={setUsername}
      />
        <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor='gray'
        value={email} 
        onChangeText={setEmail}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
         placeholderTextColor='gray'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText} > se connecter</Text>
    </TouchableOpacity>
    <Text > Vous n'avez pas de compte ?  <Link href="../signup" style={styles.linkText}>
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
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  button:{
    borderRadius: 60,
    backgroundColor:"#7B52AB",
    margin: 10,
    padding: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 10,
    color: "#7B52AB",
    fontWeight: "bold",
    fontSize: 14,
  },
  
});
