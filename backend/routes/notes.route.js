const express = require("express");
const {
  getNotes,
  postNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");
const { Auth } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", Auth, getNotes);
router.post("/", Auth, postNotes);
router.put("/:id", Auth, updateNote);
router.delete("/:id", Auth, deleteNote);

module.exports = router;
