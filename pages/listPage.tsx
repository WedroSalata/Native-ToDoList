import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import { StatusBar } from "expo-status-bar";

type listItem = {
  name: string;
  content: string;
  date: string;
};

const TESTDATA: listItem[] = [
  {
    name: "A",
    content: "1",
    date: "01-02-2020",
  },
  {
    name: "B",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, illo provident! Reiciendis atque perspiciatis aut saepe? Voluptates earum fugiat sequi",
    date: "02-02-2020",
  },
  {
    name: "C",
    content: "3",
    date: "03-02-2020",
  },
  {
    name: "D",
    content: "4",
    date: "04-02-2020",
  },
  {
    name: "E",
    content: "5",
    date: "05-02-2020",
  },
  {
    name: "E",
    content: "5",
    date: "05-02-2020",
  },
  {
    name: "E",
    content: "5",
    date: "05-02-2020",
  },
  {
    name: "E",
    content: "5",
    date: "05-02-2020",
  },
];
export default function ListPage() {
  const [listData, setListData] = useState<listItem[]>(TESTDATA);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  // ADD/EDIT form
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const clearForm = () => {
    setSelectedId(undefined);
    setName("");
    setContent("");
    setDate("");
    setEditorOpen((state) => !state);
    return;
  };
  const saveHandler = () => {
    const list = listData;
    console.log("Start", selectedId, list);
    if (!(selectedId === undefined)) {
      list.splice(selectedId, 1);
      console.log("Splicing", list);
    }
    list.unshift({ name, content, date });
    console.log("Final", list);
    setListData(list);
    clearForm();
    return;
  };

  const editHandler = () => {
    setName(listData[selectedId].name);
    setContent(listData[selectedId].content);
    setDate(listData[selectedId].date);
    setEditorOpen((state) => !state);
    return;
  };

  const addHandler = () => {
    setSelectedId(undefined);
    setEditorOpen((state) => !state);
    return;
  };
  const removeHandler = () => {
    const list = listData;
    list.splice(selectedId, 1);
    setSelectedId(undefined);
    setListData(list);
    return;
  };

  return (
    <View
      style={styles.container}
      // contentContainerStyle={styles.container}
      // invertStickyHeaders
      // stickyHeaderIndices={[1]}
    >
      <Modal
        animationType="slide"
        transparent
        visible={editorOpen}
        onRequestClose={() => {
          clearForm();
        }}
      >
        <View style={styles.editorContainer}>
          <Text>Note editor</Text>
          <View style={styles.editorSubContainer}>
            <Text>Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
            />
            <Text>Content:</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              onChangeText={setContent}
              value={content}
              multiline
            />
            <Text>Date:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDate}
              value={date}
            />
          </View>

          <View style={styles.bottomMenu}>
            <TouchableOpacity
              style={
                !name ? [styles.button, styles.disabledButton] : [styles.button]
              }
              disabled={!name}
              onPress={() => saveHandler()}
            >
              <Text
                style={
                  !name
                    ? [styles.buttonText, styles.disabledButtonText]
                    : [styles.buttonText]
                }
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => clearForm()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.list}>
        <FlatList
          data={listData}
          renderItem={(item) => CellRender(item, selectedId, setSelectedId)}
          extraData={selectedId}
        />
      </View>
      <StatusBar style="auto" />
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.button} onPress={() => addHandler()}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedId === undefined
              ? [styles.button, styles.disabledButton]
              : [styles.button]
          }
          disabled={selectedId === undefined}
          onPress={() => editHandler()}
        >
          <Text
            style={
              selectedId === undefined
                ? [styles.buttonText, styles.disabledButtonText]
                : [styles.buttonText]
            }
          >
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedId === undefined
              ? [styles.button, styles.disabledButton]
              : [styles.button]
          }
          disabled={selectedId === undefined}
          onPress={() => removeHandler()}
        >
          <Text
            style={
              selectedId === undefined
                ? [styles.buttonText, styles.disabledButtonText]
                : [styles.buttonText]
            }
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CellRender(
  data: ListRenderItemInfo<{ name: string; content: string; date: string }>,
  selectedId,
  setSelectedId: React.Dispatch<React.SetStateAction<number>>
): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
  const { name, content, date } = data.item;

  if (!name) {
    throw new Error("Item not provided");
  }

  return (
    <TouchableOpacity
      onPress={() => setSelectedId(data.index)}
      style={[
        styles.listItem,
        {
          backgroundColor: selectedId === data.index ? "#a2a8d3" : "#e7eaf6",
        },
      ]}
    >
      <View>
        <View style={styles.itemHeader}>
          <Text> {name}</Text>
          <Text> {date}</Text>
        </View>
        <Text> {content}</Text>
      </View>
    </TouchableOpacity>
  );
}

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
