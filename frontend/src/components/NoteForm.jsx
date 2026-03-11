import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../store/notes/noteSlice.js";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <section className="note-form-card">
      <div className="note-form-copy">
        <span className="section-kicker">Create note</span>
        <h2>Add a fresh note</h2>
        <p>Keep the title short and use the description for the detail you want to remember.</p>
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
            Add Note
          </button>
        </div>
      </form>
    </section>
  );
}

export default NoteForm;
