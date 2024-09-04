import react, { useState } from "react";
import LoginPage from "./pages/Login/loginPage";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ListPage from "./pages/List/listPage";

const Stack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen
            name="List"
            options={{
              title: "ToDo List",
              headerRight: () => (
                <Text
                  onPress={() => setIsSignedIn(false)}
                  style={{ marginRight: 10, textDecorationLine: "underline" }}
                >
                  Log out
                </Text>
              ),
            }}
            component={ListPage}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginPage}
            initialParams={{ setIsSignedIn: setIsSignedIn }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
