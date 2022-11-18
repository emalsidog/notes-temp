const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const Note = mongoose.model("Note", notesSchema);

module.exports = { Note };
