import { Stack } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";
import { ContactProvider } from "@/contexts/ContactContext";  // <= importe ton context ici

export default function RootLayout() {
  return (
    <ContactProvider>  
      <MenuProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
        </Stack>
      </MenuProvider>
    </ContactProvider>
  );
}
