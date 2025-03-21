import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatScreen from './chat';
import StatusScreen from "./status";
import CallsScreen from "./call";

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#075E54" },
        tabBarLabelStyle: { color: "white", fontWeight: "bold" },
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Calls" component={CallsScreen} />
    </Tab.Navigator>
  );
}
