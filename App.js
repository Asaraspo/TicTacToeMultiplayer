import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import "react-native-gesture-handler";

import LobbyScreen from "./src/screens/LobbyScreen";
import GameScreen from "./src/screens/GameScreen";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
