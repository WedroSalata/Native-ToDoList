import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NoteForm from "../../components/NoteForm/noteForm";
import { add, edit, remove } from "../../store/slice";
import { ListItem } from "../../types/mainTypes";
import ButtonMenu from "./buttonMenu";
import styles from "./styles";

export default function ListPage({ navigation }) {
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [location, setLocation] = useState("");

  const noteArray: ListItem[] = useSelector(
    (state: any) => state.noteState.noteArray
  );

  const getData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("error");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(JSON.stringify(location));
  };
  const dispatch = useDispatch();

  const saveHandler = useCallback(
    (item: ListItem) => {
      if (selectedId !== undefined) {
        dispatch(edit({ noteArray: item, index: selectedId }));
      } else {
        dispatch(add(item));
      }
    },
    [selectedId, noteArray]
  );

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
  }, []);

  const editHandler = useCallback(() => {
    setEditorOpen((state) => !state);
  }, []);

  const addHandler = useCallback(() => {
    setSelectedId(undefined);
    navigation.navigate({
      name: "Add Note",
      params: { saveHandler },
    });
  }, []);

  const removeHandler = useCallback(() => {
    if (selectedId !== undefined) {
      dispatch(remove(selectedId));
      setSelectedId(undefined);
    }
  }, [noteArray, selectedId]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={editorOpen}
        onRequestClose={() => {
          closeEditor();
        }}
      >
        <NoteForm
          saveHandler={saveHandler}
          closeEditor={closeEditor}
          item={selectedId >= 0 ? noteArray[selectedId] : undefined}
        />
      </Modal>
      <View style={styles.list}>
        <FlatList
          data={noteArray}
          renderItem={(item) => CellRender(item, selectedId, setSelectedId)}
          extraData={selectedId}
        />
      </View>
      <ButtonMenu
        selectedId={selectedId}
        addHandler={addHandler}
        editHandler={editHandler}
        removeHandler={removeHandler}
      />
      <Text>{location}</Text>
      <Button title={"location"} onPress={() => getData()} />
      <StatusBar style="auto" />
    </View>
  );
}

function CellRender(
  data: ListRenderItemInfo<{ name: string; content: string; date: string }>,
  selectedId: number | undefined,
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
