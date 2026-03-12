import axios from "axios";
import { API_URL } from "../../config/api.js";

const NOTES_API_URL = `${API_URL}/notes/`;

// Create new note
const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(NOTES_API_URL, noteData, config);

  return response.data;
};

// Get user notes
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(NOTES_API_URL, config);

  return response.data;
};

// Delete user note
const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(NOTES_API_URL + noteId, config);

  return response.data;
};

// Update user note
const updateNote = async (noteId, noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(NOTES_API_URL + noteId, noteData, config);

  return response.data;
};

const noteService = {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
};

export default noteService;
