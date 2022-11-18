import React from "react";

import { getRandomCoordsAndRotation } from "../../utils";

import styles from "./styles.module.css";

export const Note = ({ id, text, onDelete, onEdit }) => {
  const [coords, set$coords] = React.useState(null);

  const [isEditingMode, set$isEditingMode] = React.useState(false);
  const [newText, set$newText] = React.useState("");

  const handleEdit = () => {
    set$newText(text);
    set$isEditingMode(true);
  };

  const handleSaveEditing = () => {
    try {
      onEdit({ id, newText }, () => {
        set$isEditingMode(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewTextChange = (e) => {
    set$newText(e.target.value);
  };

  React.useEffect(() => {
    set$coords(getRandomCoordsAndRotation());
  }, []);

  if (!coords) return;

  return (
    <div
      style={{
        top: coords.yPos,
        left: coords.xPos,
        transform: `rotate(${coords.rotation})`,
      }}
      className={styles.root}
    >
      {isEditingMode ? (
        <textarea
          className={styles.textarea}
          onChange={handleNewTextChange}
          value={newText}
        ></textarea>
      ) : (
        <div className={styles.text}>{text}</div>
      )}
      <div className={styles.actions}>
        {isEditingMode ? (
          <button onClick={handleSaveEditing}>Done</button>
        ) : (
          <React.Fragment>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={onDelete}>Remove</button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
