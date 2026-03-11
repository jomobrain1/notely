import { useDispatch } from "react-redux";
import { deleteNote } from "../store/notes/noteSlice.js";

function NoteItem({ note }) {
  const dispatch = useDispatch();

  return (
    <div className="Note">
      <div>{new Date(note.createdAt).toLocaleString("en-US")}</div>
      <h2>{note.title}</h2>
      {note.description ? <p>{note.description}</p> : null}
      <button onClick={() => dispatch(deleteNote(note._id))} className="close">
        X
      </button>
    </div>
  );
}

export default NoteItem;
