import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import 'react-native-get-random-values';
import { API_URL, PROJECT_ID, logNetworkInfo } from '@/lib/constants';

export class AuthenticationService {
  private static api = new SnappyHTTPClient(API_URL);

  public static async login(email: string, password: string, router: any, setIsAuthentificating: any) {
    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    // Log des informations de debug
    logNetworkInfo();

    // Handle login
    if (!password || !email) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    try {
      setIsAuthentificating(true);
      
      console.log('=== TENTATIVE DE CONNEXION ===');
      console.log('Email:', email);
      console.log('API URL utilisée:', API_URL);
      console.log('Project ID:', PROJECT_ID);

      // Test de connectivité d'abord
      const connectivityTest = await this.testConnectivity();
      if (!connectivityTest.success) {
        setIsAuthentificating(false);
        Alert.alert(
          "Erreur de réseau", 
          `Impossible de se connecter au serveur.\n\nDétails:\n${connectivityTest.error}\n\nURL: ${API_URL}`,
          [{ text: "OK" }]
        );
        return;
      }

      // Authenticate user
      const authResult = await this.api.authenticateUser({
        projectId: PROJECT_ID,
        login: email,
        secret: password,
      });

      console.log('Authentification réussie:', authResult.data.displayName);

      // Save user in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(authResult.data));
      
      setIsAuthentificating(false);
      router.push("/home");

    } catch (error: any) {
      console.error("=== ERREUR DÉTAILLÉE ===");
      console.error("Type d'erreur:", error.constructor.name);
      console.error("Message:", error.message);
      console.error("Code:", error.code);
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);
      console.error("URL appelée:", error.config?.url);
      console.error("========================");

      setIsAuthentificating(false);

      // Messages d'erreur détaillés selon le type
      let errorMessage = "Une erreur s'est produite lors de la connexion.";
      let errorDetails = "";

      if (error.message?.includes('Network Error')) {
        errorMessage = "Erreur de réseau";
        errorDetails = `Impossible de joindre le serveur.\n\nURL: ${API_URL}\n\nVérifiez votre connexion internet et réessayez.`;
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('timeout')) {
        errorMessage = "Timeout de connexion";
        errorDetails = "Le serveur met trop de temps à répondre.\n\nVérifiez votre connexion internet.";
      } else if (error.response?.status === 401) {
        errorMessage = "Identifiants incorrects";
        errorDetails = "Email ou mot de passe incorrect.";
      } else if (error.response?.status === 404) {
        errorMessage = "Service indisponible";
        errorDetails = "Le serveur de connexion n'est pas accessible.";
      } else if (error.response?.status >= 500) {
        errorMessage = "Erreur serveur";
        errorDetails = "Le serveur rencontre une erreur temporaire.";
      } else {
        errorDetails = `Erreur technique:\n${error.message || 'Erreur inconnue'}`;
      }

      Alert.alert(
        errorMessage,
        errorDetails,
        [
          { text: "Réessayer", onPress: () => this.login(email, password, router, setIsAuthentificating) },
          { text: "Annuler", style: "cancel" }
        ]
      );
    }
  }

  // Test de connectivité réseau
  private static async testConnectivity(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('Test de connectivité vers:', API_URL);
      
      // Test simple avec fetch et timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes

      const response = await fetch(API_URL, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      console.log('Test connectivité - Status:', response.status);
      console.log('Test connectivité - Headers:', response.headers);

      return { success: true };

    } catch (error: any) {
      console.error('Test connectivité échoué:', error.message);
      
      let errorMsg = error.message;
      if (error.name === 'AbortError') {
        errorMsg = 'Timeout de connexion (10s)';
      } else if (error.message?.includes('Network request failed')) {
        errorMsg = 'Réseau inaccessible';
      }

      return { 
        success: false, 
        error: errorMsg 
      };
    }
  }

  public static async register(email: string, password: string, confirm_password: string, username: string, router: any, setIsAuthentificating: any) {
    const { v4: uuidv4 } = require('uuid');
    console.log("start register for email", email);
    const externalId = uuidv4();

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    if (!username || !password || !email || !confirm_password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    if (confirm_password != password) {
      alert("mot de passe different, veillez saisir à nouveau votre mot de passe.")
      return;
    }

    try {
      setIsAuthentificating(true);

      // Test de connectivité d'abord
      const connectivityTest = await this.testConnectivity();
      if (!connectivityTest.success) {
        setIsAuthentificating(false);
        Alert.alert(
          "Erreur de réseau", 
          `Impossible de se connecter au serveur.\n\nDétails:\n${connectivityTest.error}`,
          [{ text: "OK" }]
        );
        return;
      }

      const result = await this.api.createUser({
        "projectId": PROJECT_ID,
        "externalId": externalId,
        "avatar": "../assets/images/profile.png",
        "displayName": username,
        "email": email,
        "login": email,
        "secret": password
      });

      console.log(result);
      setIsAuthentificating(false);

      await AsyncStorage.setItem('user', JSON.stringify(result));
      Alert.alert(result!.displayName!, "Votre compte a été créé avec succès !");
      
      this.login(email, password, router, setIsAuthentificating);

    } catch (error: any) {
      console.error("Error during registration:", error);
      setIsAuthentificating(false);
      
      let errorMessage = "Une erreur s'est produite lors de l'inscription.";
      if (error.message?.includes('Network Error')) {
        errorMessage = "Erreur de réseau. Vérifiez votre connexion internet.";
      } else if (error.response?.status === 409) {
        errorMessage = "Un compte avec cet email existe déjà.";
      }
      
      alert(errorMessage);
    }
  }
}