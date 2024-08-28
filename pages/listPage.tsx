import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ListPage() {
  return (
    <View style={styles.container}>
      <Text>Succsesfully authorized</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
