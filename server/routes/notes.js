const express = require("express");

const { Note } = require("../models/note");

const router = express.Router();

router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send({ message: "internal" });
  }
});

router.post("/note/create", async (req, res) => {
  const { text = "" } = req.body;

  if (!text) {
    return res.status(400).send({ message: "not ok" });
  }

  try {
    const note = new Note({ text, dateCreated: new Date() });
    await note.save();

    res.status(201).json({ note });
  } catch (error) {
    res.status(500).send({ message: "internal" });
  }
});

router.put("/note/:id/edit", async (req, res) => {
  const { id = "" } = req.params;

  if (!id) {
    return res.status(400).send({ message: "not ok" });
  }

  const { newText } = req.body;

  try {
    await Note.findOneAndUpdate({ _id: id }, { text: newText });

    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).send({ message: "internal" });
  }
});

router.delete("/note/:id/delete", async (req, res) => {
  const { id = "" } = req.params;

  if (!id) {
    return res.status(400).send({ message: "not ok" });
  }

  try {
    await Note.findOneAndDelete({ _id: id });

    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).send({ message: "internal" });
  }
});

module.exports = { router };
