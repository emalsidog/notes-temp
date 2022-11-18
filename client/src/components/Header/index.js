import React from "react";

import { CreateNote } from "../CreateNote";

import styles from "./styles.module.css";

export const Header = ({ onNoteCreated }) => {
  return (
    <div className={styles.root}>
      <div className={styles.text}>Notes</div>
      <CreateNote onNoteCreated={onNoteCreated} />
    </div>
  );
};
