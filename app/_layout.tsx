import { Stack } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </MenuProvider>
  );
}
