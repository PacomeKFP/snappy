import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";

export class AuthenticationService {


  public static async login(email: string, password: string, router: any) {
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
      // Connect to the server
      const snappy = new SnappyHTTPClient("http://88.198.150.195:8613");
      const projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

      // Authenticate user

      const result = await snappy.authenticateUser({
        projectId,
        login: email,
        secret: password,
      });

      router.push("/home");
    } catch (error) {

      console.error("Error during authentication:", error);
      // alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
    
    }


  }

  public static async register(){
    // TODO faire le necessaire ici
  }
}