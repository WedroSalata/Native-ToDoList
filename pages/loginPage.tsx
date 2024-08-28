import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LoginPage({navigation }) {
  return (
    <View style={styles.container}>
      <Text>Time to login into your To-Do!</Text>
      <View>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </View>
      <Button
        onPress={() => {navigation.navigate('List')}}
        title="Sign in"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    padding: "1%",
    marginBottom: "1%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
