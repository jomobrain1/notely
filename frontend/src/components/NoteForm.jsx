import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createNote, updateNote } from "../store/notes/noteSlice.js";

function NoteForm({ noteToEdit, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
      return;
    }

    setTitle("");
    setDescription("");
  }, [noteToEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (noteToEdit) {
        const response = await dispatch(
          updateNote({ id: noteToEdit._id, noteData: { title, description } }),
        ).unwrap();
        toast.success(response.message || "Note updated successfully");
        onCancelEdit();
        return;
      }

      const response = await dispatch(createNote({ title, description })).unwrap();
      toast.success(response.message || "Note created successfully");
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <section className="note-form-card">
      <div className="note-form-copy">
        <span className="section-kicker">
          {noteToEdit ? "Edit note" : "Create note"}
        </span>
        <h2>{noteToEdit ? "Update your note" : "Add a fresh note"}</h2>
        <p>{noteToEdit ? "Make your changes and save them." : "Keep the title short and use the description for the detail you want to remember."}</p>
      </div>

      <form onSubmit={onSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter note description"
            rows="6"
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            {noteToEdit ? "Save Changes" : "Add Note"}
          </button>
        </div>
        {noteToEdit ? (
          <div className="form-group">
            <button
              className="btn btn-block btn-secondary"
              type="button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </section>
  );
}

export default NoteForm;
