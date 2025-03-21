import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ConfirmPassword() {
  const router = useRouter(); // Permet de naviguer entre les écrans

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Confirmation du mot de passe</Text>
      <Button title="Retour" onPress={() => router.back()} />
    </View>
  );
}
