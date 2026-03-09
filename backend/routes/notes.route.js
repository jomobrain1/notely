const express = require("express");
const {
  getNotes,
  postNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");
const router = express.Router();

router.get("/", getNotes);
router.post("/", postNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
