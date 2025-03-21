import { Stack} from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from './login';
import HomeScreen from './home';
export default function RootLayout() {
  return <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="index" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
</NavigationContainer>
}
