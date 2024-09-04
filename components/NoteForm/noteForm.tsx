import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { ListItem } from "../../types/mainTypes";

type Props = {
  saveHandler: (obj: ListItem) => void;
  closeEditor: () => void;
  item?: ListItem;
};

function NoteForm({ saveHandler, closeEditor, item }: Props) {
  const [name, setName] = useState<string>(item?.name ?? "");
  const [content, setContent] = useState<string>(item?.content ?? "");
  const [date, setDate] = useState<string>(item?.date ?? "");

  const clearForm = () => {
    setName("");
    setContent("");
    setDate("");
    closeEditor();
  };

  return (
    <View style={styles.editorContainer}>
      <Text>Note editor</Text>
      <View style={styles.editorSubContainer}>
        <Text>Name:</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />
        <Text>Content:</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          onChangeText={setContent}
          value={content}
          multiline
        />
        <Text>Date:</Text>
        <TextInput style={styles.input} onChangeText={setDate} value={date} />
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={
            !name ? [styles.button, styles.disabledButton] : [styles.button]
          }
          disabled={!name}
          onPress={() => saveHandler({ name, content, date })}
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
  );
}

export default NoteForm;
