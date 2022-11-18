import React from "react";
import axios from "axios";

import { Note } from "../Note";
import { Header } from "../Header";

export const App = () => {
  const [notes, set$notes] = React.useState([]);

  const [isGettingNotes, set$isGettingNotes] = React.useState(false);

  const onNoteCreated = (note) => {
    set$notes((prev) => [...prev, note]);
  };

  const getNotes = async () => {
    try {
      set$isGettingNotes(true);

      const response = await axios.get("/api/notes");

      set$notes(response.data);
    } catch (error) {
    } finally {
      set$isGettingNotes(false);
    }
  };

  const deleteNote = (id) => async () => {
    try {
      await axios.delete(`/api/note/${id}/delete`, { id });

      set$notes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const editNote = async ({ id, newText }, onSuccess) => {
    try {
      await axios.put(`/api/note/${id}/edit`, { id, newText });

      set$notes((prev) =>
        prev.map((note) => {
          if (note.id === id) {
            return {
              ...note,
              text: newText,
            };
          }

          return note;
        })
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  React.useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Header onNoteCreated={onNoteCreated} />
      {isGettingNotes ? (
        <div>Loading...</div>
      ) : (
        <div>
          {notes.map((note) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                text={note.text}
                onDelete={deleteNote(note.id)}
                onEdit={editNote}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
