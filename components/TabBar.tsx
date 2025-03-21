import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../app/home";
import CallsScreen from "../app/call";
import SettingsScreen from "../app/status";

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#075E54" },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Messages"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Appels"
        component={CallsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="call-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Paramètres"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
