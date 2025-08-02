import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReadOnlyNote from "./ReadOnlyNote";
import "../../styles/Note/noteSettings.css";

const NoteSettings = () => {
  const { id } = useParams();
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    if (id) {
      const userNotes = JSON.parse(localStorage.getItem("userNotes"));
      if (userNotes) {
        setNoteData(userNotes.find((note) => note?.noteId === id));
      }
    }
  }, [id]);

//   const settingsOptions = {
//     {
//         id: 1,

//     }
//   }

  return (
    <div className="note-settings-container">
      <div className="current-note">
        <span>Selected Note</span>
        <ReadOnlyNote
          title={noteData?.title}
          details={noteData?.description}
          noteBG={noteData?.noteBG}
        />
      </div>
      <div className="settings">
        <section className="settings-heading">
            <span>Settings</span>
        </section>
      </div>
    </div>
  );
};

export default NoteSettings;
