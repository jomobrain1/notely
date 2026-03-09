const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a text"],
    },
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;
