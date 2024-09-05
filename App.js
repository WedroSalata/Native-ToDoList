import react, { useState } from "react";
import LoginPage from "./pages/Login/loginPage";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ListPage from "./pages/List/listPage";
import routerNoteForm from "./components/NoteForm/routerNoteForm";

const Stack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator>
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
          <Stack.Screen name="Add Note" component={routerNoteForm} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            initialParams={{ setIsSignedIn: setIsSignedIn }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
