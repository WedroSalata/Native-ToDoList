import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

type Props = {
  selectedId?: number;
  addHandler: () => void;
  editHandler: () => void;
  removeHandler: () => void;
};

export default function ButtonMenu({
  selectedId,
  addHandler,
  editHandler,
  removeHandler,
}: Props) {
  return (
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
  );
}
