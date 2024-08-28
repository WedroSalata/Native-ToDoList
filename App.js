import * as React from 'react';
import LoginPage from "./pages/loginPage";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListPage from './pages/listPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LoginPage} />
        <Stack.Screen name="List" component={ListPage} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
