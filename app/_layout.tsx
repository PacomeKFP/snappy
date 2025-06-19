import { Stack } from "expo-router";
import { ContactProvider } from "@/contexts/ContactContext";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {  SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>

      <ContactProvider>
        <Stack screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="status" options={{ headerShown: false }} />
          <Stack.Screen name="newchat" options={{ headerShown: false }} />
          <Stack.Screen name="ChatItems" options={{ headerShown: false }} />
          <Stack.Screen name="addContact" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="settingItems" options={{ headerShown: false }} />
        </Stack>
      </ContactProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}