import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export class AuthenticationService {

  public static async login(email: string, password: string, router: any,setIsAuthentificating :any) {
    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

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
      const snappy = new SnappyHTTPClient("http://88.198.150.195:8613");
      
      // Authenticate user

      await snappy.authenticateUser({
        projectId,
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

    const projetId ="81997082-7e88-464a-9af1-b790fdd454f8";

    //generate externalId
    const { v4: uuidv4 } = require('uuid');
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

          //connect to server 
          const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")

          //create user
          setIsAuthentificating(true)
        const result = await snappy.createUser({
            "projectId":projetId,
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
    // alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
  
  }
}
}