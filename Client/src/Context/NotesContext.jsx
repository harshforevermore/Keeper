import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNotification } from "./Notification/NotificationContext";

const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

const NotesProvider = ({ children }) => {
  const { userPublicId } = useContext(AuthContext);
  const showNotification = useNotification();
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    if (!userPublicId) {
      const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
      if (savedNotes) {
        setUserNotes(savedNotes);
      }
    }
  }, []);
  useEffect(() => {
    if (!userPublicId && userNotes.length > 0) {
      localStorage.setItem("savedNotes", JSON.stringify(userNotes));
    }
  }, [userNotes]);

  const addNote = (getUserNotes, vis = "Private") => {
    if (!userPublicId) {
      showNotification(
        "Your Notes are being saved locally, Login to save on server.",
        "info"
      );
      const tempUniqueId = crypto.randomUUID();
      const localNote = {
        noteId: tempUniqueId,
        ...getUserNotes,
        visibility: vis,
        noteBG: "#f0f0f0",
        isSynced: false,
        isTrashed: false,
      };
      setUserNotes([localNote, ...userNotes]);
    } else {
      setUserNotes([getUserNotes, ...userNotes]);
    }
  };
  const deleteNote = (id) => {
    setUserNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== id));
    showNotification("Note Deleted Successfully", "success");
  };
  const trashNote = (id) => {
    setUserNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === id ? { ...note, isTrashed: true } : note
      )
    );
    showNotification("Successfully moved note to Trash", "success");
  };
  const restoreNote = (id) => {
    setUserNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === id ? { ...note, isTrashed: false } : note
      )
    );
    showNotification("Successfully restored note", "success");
  };
  const updateNote = (id, newTitle, newDetails) => {
    setUserNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === id
          ? { ...note, title: newTitle, description: newDetails }
          : note
      )
    );
  };
  const updateNoteBG = (newBG, id) => {
    setUserNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === id ? { ...note, noteBG: newBG } : note
      )
    );
  };
  const changeVisibility = (newVis, id) => {
    setUserNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === id ? { ...note, visibility: newVis } : note
      )
    );
  };
  return (
    <NotesContext.Provider
      value={{
        userNotes,
        addNote,
        deleteNote,
        updateNote,
        updateNoteBG,
        changeVisibility,
        trashNote,
        restoreNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
