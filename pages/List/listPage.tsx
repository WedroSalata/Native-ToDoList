import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import NoteForm from "../../components/NoteForm/noteForm";
import ButtonMenu from "./buttonMenu";
import { ListItem } from "../../types/mainTypes";
import { TESTDATA } from "../../helpers/dataMock";

export default function ListPage({ navigation }) {
  const [listData, setListData] = useState<ListItem[]>(TESTDATA);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  const saveHandler = useCallback(
    (item: ListItem) => {
      const list = [...listData];
      if (selectedId !== undefined) {
        list.splice(selectedId, 1);
      }
      list.unshift(item);
      setListData(list);
    },
    [listData, selectedId]
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
      const list = [...listData];
      list.splice(selectedId, 1);
      setSelectedId(undefined);
      setListData(list);
    }
  }, [listData, selectedId]);

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
          item={selectedId >= 0 ? listData[selectedId] : undefined}
        />
      </Modal>
      <View style={styles.list}>
        <FlatList
          data={listData}
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
