import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteNote } from "../store/notes/noteSlice.js";

function NoteItem({ note, onEdit }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteNote(note._id)).unwrap();
      toast.success(response.message || "Note deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete note");
    }
  };

  return (
    <article className="note-card">
      <div className="note-card-header">
        <span className="note-date">
          {new Date(note.createdAt).toLocaleString("en-US")}
        </span>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="close">
            Edit
          </button>
          <button onClick={handleDelete} className="close">
            Delete
          </button>
        </div>
      </div>
      <h3>{note.title}</h3>
      {note.description ? <p>{note.description}</p> : null}
    </article>
  );
}

export default NoteItem;
