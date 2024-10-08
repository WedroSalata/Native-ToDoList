import { StyleSheet } from "react-native";

export default StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    padding: "1%",
    marginVertical: 5,
  },
  container: {
    flex: 1,
    width: 350,
    margin: "auto",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  subcontainer: {
    width: "70%",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#3F72AF",
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
  },
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#F9F7F7",
  },
});
