const express = require("express");
const mongoose = require("mongoose");

const { notesRouter } = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", notesRouter);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/notes");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`Service is listening on port ${PORT}`);
  });
};

start();