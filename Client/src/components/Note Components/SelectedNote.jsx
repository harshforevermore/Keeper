import { useParams } from "react-router-dom";
import "../../styles/Note/selectedNote.css";
import Note from "./Note";
import { useNotes } from "../../Context/NotesContext";
import { useEffect, useState } from "react";

const SelectedNote = () => {
  const { id } = useParams();
  const { updateNote, updateNoteBG } = useNotes();
  const [currNote, setCurrNote] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
    if (savedNotes) {
      setCurrNote(savedNotes.find((note) => note?.noteId === id));
    }
  }, [id]);
  return (
    <div id="selected-note-container">
      {currNote && (
        <Note
          noteId={currNote?.noteId}
          update={updateNote}
          heading={currNote?.title}
          details={currNote?.description}
          updateNoteBG={updateNoteBG}
          noteBG={currNote?.noteBG}
          trashed={currNote?.isTrashed}
        />
      )}
    </div>
  );
};

export default SelectedNote;
