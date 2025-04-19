import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import 'react-native-get-random-values';
import { API_URL, PROJECT_ID } from '@/lib/constants'; 


export class AuthenticationService {
  private static api = new SnappyHTTPClient(API_URL);

  public static async login(email: string, password: string, router: any,setIsAuthentificating :any) {
    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

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
      setIsAuthentificating(true)
      // Connect to the server
      
      // Authenticate user

      await this.api.authenticateUser({
        projectId:PROJECT_ID,
        login: email,
        secret: password,
      });

      //save user inn AsyncSTorage
      
    AsyncStorage.getItem('user').then((value) => {
      if (value !== null) {
        // We have data!!
        console.log("user", JSON.parse(value));
      }
    });

      setIsAuthentificating(false)
    
      router.push("/home");
    } catch (error) {

      console.error("Error during authentication:", error);
      setIsAuthentificating(false)
      // alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
    
    }

  }

  public static async register(email: string, password: string, confirm_password : string , username: string, router :any,setIsAuthentificating:any) {    

  
    //generate externalId
    const { v4: uuidv4 } = require('uuid');
    console.log("start register for email", email);
    const externalId = uuidv4();

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

   
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

          
          //create user
          setIsAuthentificating(true)

        const result = await this.api.createUser({
            "projectId":PROJECT_ID,
            "externalId":externalId,
            "avatar":"../assets/images/logo.png",
            "displayName":username,
            "email":email,
            "login":email,
            "secret":password
           })
           console.log(result);
          
           setIsAuthentificating(false)

             //save user inn AsyncSTorage
          await AsyncStorage.setItem('user', JSON.stringify(result));

          Alert.alert(result!.displayName!, "Votre compte a été créé avec succès !")
           //authentificate user
           this.login(email, password, router, setIsAuthentificating)
           //router.push("/home");
  }catch (error) {

    console.error("Error during registration:", error);
    setIsAuthentificating(false)
    alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
  
  }
}
}