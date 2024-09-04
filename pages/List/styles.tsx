import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  editorContainer: {
    width: 350,
    margin: "auto",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  editorSubContainer: {
    width: "75%",
  },
  list: { height: 500 },
  listItem: {
    marginVertical: 6,
    padding: 5,
    width: 300,
    minHeight: 70,
    maxHeight: 200,
    borderRadius: 5,
    borderTopLeftRadius: 0,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    padding: "1%",
    marginBottom: "1%",
    width: "auto",
  },
  inputMultiline: {
    height: 80,
  },
  button: {
    backgroundColor: "#3F72AF",
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#F9F7F7",
  },
  disabledButtonText: {
    color: "gray",
  },
});

export default styles;
