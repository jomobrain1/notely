const Note = require("../models/Note");
// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  console.log(req);
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json({
    message: "Notes retrieved",
    success: true,
    data: notes,
  });
};

// @desc    Post notes
// @route   POST /api/notes
// @access  Private
const postNotes = async (req, res) => {
  try {
    if (!req.body.description || !req.body.title) {
      res.status(400).json({
        message: "Please ensure all fields are  provided",
        success: false,
      });
    }

    const note = await Note.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id,
    });
    res.status(200).json({
      message: "Notes created successfully",
      success: true,
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Update notes
// @route   PUT /api/notes
// @access  Private
const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400).json({
      message: "Note not found",
      success: false,
    });
  }
  // Check for user
  if (!req.user) {
    res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  // Make sure the logged in user matches the note user
  if (note.user.toString() !== req.user.id) {
    res.status(401).json({
      message: "User not authorized",
      success: false,
    });
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Note retrieved",
    success: true,
    data: updatedNote,
  });
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404).json({
      message: "Note not found",
      success: false,
    });
  }
  // Check for user
  if (!req.user) {
    res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  // Make sure the logged in user matches the note user
  if (note.user.toString() !== req.user.id) {
    res.status(401).json({
      message: "User not authorized",
      success: false,
    });
  }
  await Note.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Note deleted",
    success: true,
    data: note,
  });
};
module.exports = { getNotes, postNotes, updateNote, deleteNote };
