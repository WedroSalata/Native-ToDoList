import React, { useCallback } from "react";
import NoteForm from "./noteForm";

export default function routerNoteForm({ route, navigation }) {
  const closeEditor = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <NoteForm
      saveHandler={route.params.saveHandler}
      closeEditor={closeEditor}
    />
  );
}
