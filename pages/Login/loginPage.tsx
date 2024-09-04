import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";

export default function LoginPage({ route }) {
  const { setIsSignedIn } = route.params;

  return (
    <View style={styles.container}>
      <Text>ToDo List</Text>
      <View style={styles.subcontainer}>
        <Text>Login: </Text>
        <TextInput style={styles.input} />
        <Text>Password: </Text>
        <TextInput style={styles.input} secureTextEntry />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsSignedIn(true);
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
