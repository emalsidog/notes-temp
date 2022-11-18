import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import styles from "./styles.module.css";

export const CreateNote = ({ onNoteCreated }) => {
  const [noteText, set$noteText] = React.useState("");
  const [isMenuVisible, set$isMenuVisible] = React.useState(false);

  const [isCreatingNote, set$isCreatingNote] = React.useState(false);

  const handleNoteTextChange = (e) => {
    set$noteText(e.target.value);
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      set$isCreatingNote(true);

      const response = await axios.post("/api/note/create", {
        text: noteText,
      });

      set$noteText("");
      set$isMenuVisible(false);

      onNoteCreated(response.data.note);
    } catch (error) {
      console.error(error);
    } finally {
      set$isCreatingNote(false);
    }
  };

  const handleCancelCreating = () => {
    set$noteText("");
    set$isMenuVisible(false);
  };

  return (
    <div className={styles.root}>
      <div
        onClick={() => set$isMenuVisible(!isMenuVisible)}
        className={styles.createButtonContainer}
      >
        Create new note
      </div>

      {ReactDOM.createPortal(
        <form
          onSubmit={handleCreateNote}
          className={`${styles.menu} ${
            isMenuVisible ? styles.visible : styles.hidden
          }`}
        >
          <input
            value={noteText}
            onChange={handleNoteTextChange}
            placeholder="Note text"
          />
          <div className={styles.actions}>
            <button type="button" onClick={handleCancelCreating}>
              Cancel
            </button>
            <button type="submit">
              {isCreatingNote ? "Creating" : "Create"}
            </button>
          </div>
        </form>,
        document.getElementById("root")
      )}
    </div>
  );
};
