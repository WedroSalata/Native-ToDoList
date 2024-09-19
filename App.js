import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import react, { useState } from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import routerNoteForm from "./components/NoteForm/routerNoteForm";
import ListPage from "./pages/List/listPage";
import LoginPage from "./pages/Login/loginPage";
import { persistor, store } from "./store/store";

const Stack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
                      style={{
                        marginRight: 10,
                        textDecorationLine: "underline",
                      }}
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
      </PersistGate>
    </Provider>
  );
}
