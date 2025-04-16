import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export  class ContactService{

    public static async addContact(email : string,username:string, onClose: any){
        const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
        const projectId = "81997082-7e88-464a-9af1-b790fdd454f8";

        if (!validateEmail(email)) {
            alert("Veuillez entrer une adresse email valide.");
            return;
          }

        try{
            // Connect to the server
            const snappy = new SnappyHTTPClient("http://88.198.150.195:8613");
            
            //get user's externalId

            Alert.alert(
                "Confirmation",
                `Voulez-vous ajouter ${email} ?`,
                [
                  { text: "Annuler", style: "cancel" },
                  { text: "OK", onPress: () => {
                    snappy.filterUserByDisplayName({
                      "displayName": username,
                      "projectId": projectId
                    }).then(async (otherUser) => {
                      if (otherUser.length > 0) {
                        snappy.addContact({
                          "requesterId":await (async () => {
                            const value = await AsyncStorage.getItem("user");
                            if (value !== null) {
                                // We have data!!
                                return JSON.parse(value).externalId;
                            }
                            return snappy.getUser()!.externalId!;
                        })(), //get user's ID
                          "contactId": otherUser[0]!.id!, 
                          "projectId":projectId
                        });
                        
                        onClose();
                      } else {
                        alert("No contacts found.");
                      }
                    }).catch((error) => {
                      alert("Failed to fetch contacts: " + error.message);
                    });
                    onClose()} }
                ]
              );
        
        
       }catch(error){
         console.error("Error during authentication:", error);
     
         }
    }
 
    public static async getViewContact(){
        const snappy = new SnappyHTTPClient("http://88.198.150.195:8613")
        const projectId = "81997082-7e88-464a-9af1-b790fdd454f8"
        
        const Contact = await snappy.getUserContacts({
            "projectId":projectId,
            "userExternalId": await (async () => {
                const value = await AsyncStorage.getItem("user");
                if (value !== null) {
                    // We have data!!
                    return JSON.parse(value).externalId;
                }
                return snappy.getUser()!.externalId!;
            })()
        })
        return Contact
    }
}