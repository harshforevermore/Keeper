import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadOnlyNote from "./ReadOnlyNote";
import { FaUserFriends, FaRegCircle, FaCircle } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { FaPlus, FaMinus, FaUserLock } from "react-icons/fa6";
import { useConfirm } from "../../Context/ConfirmContext";
import { useNotes } from "../../Context/NotesContext";
import "../../styles/Note/noteSettings.css";

const NoteSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {confirm} = useConfirm();
  const {changeVisibility, deleteNote, trashNote} = useNotes();

  const [noteData, setNoteData] = useState(null);
  const [noteVisibility, setNoteVisibility] = useState("Private");
  const [showVisibilityOptions, setShowVisibilityOptions] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  useEffect(() => {
    if (id) {
      const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
      if (savedNotes) {
        setNoteData(savedNotes.find((note) => note?.noteId === id));
      }
    }
  }, [id]);

  const handleVisibilityChange = async (name) => {
    if(noteVisibility !== name) { //if not already selected...
      const confirmChange = await confirm(`Confirm visibility change to ${name}`);
      if(confirmChange) {
        setNoteVisibility(name);
        changeVisibility(name, id);  //call function from NotesContext
      }
    }
  }
  const handleMoveToTrash = async () => {
      const confirmTrash = await confirm(`Move to Trash?`);
      if(confirmTrash) {
        trashNote(id);
        navigate("/");
      }
  }
  const handleDeletePermanently = async () => {
    const confirmDelete = await confirm(`Delete Permanently?`);
    if(confirmDelete) {
      deleteNote(id);
      navigate("/");
    }
  }

  const settingsOptions = {
    changeVisibility: {
      name: "Change Visibility",
      visibilityOptions: [
        {
          optionName: "Private",
          optionIcon: <FaUserLock />,
          optionSelected:
            noteVisibility === "Private" ? <FaCircle /> : <FaRegCircle />,
        },
        {
          optionName: "Shared",
          optionIcon: <FaUserFriends />,
          optionSelected:
            noteVisibility === "Shared" ? <FaCircle /> : <FaRegCircle />,
        },
        {
          optionName: "Public",
          optionIcon: <TbWorld />,
          optionSelected:
            noteVisibility === "Public" ? <FaCircle /> : <FaRegCircle />,
        },
      ],
    },
  };

  return (
    <div className="note-settings-container">
      <div className="current-note">
        <span className="page-heading">Selected Note</span>
        <ReadOnlyNote
          title={noteData?.title}
          details={noteData?.description}
          noteBG={noteData?.noteBG}
        />
      </div>
      <div className="settings">
        <section className="settings-heading">
          <span className="page-heading">Settings</span>
        </section>
        <section className="setting">
          <section
            onClick={() => setShowVisibilityOptions((prev) => !prev)}
            className="option-main"
          >
            <span className="setting-name">
              {settingsOptions["changeVisibility"]?.name}
            </span>
            <section className="plus-minus-icon">
              {showVisibilityOptions ? <FaMinus /> : <FaPlus />}
            </section>
          </section>
          {showVisibilityOptions && (
            <section id="visibility-dropdown">
              {settingsOptions["changeVisibility"]?.visibilityOptions.map(
                (item) => (
                  <section key={item.optionName} onClick={() => handleVisibilityChange(item.optionName)} className="visibility-choice">
                    <section id="option-name-icon">
                      <span id="option-icon">{item.optionIcon}</span>
                      <span id="option-name">{item.optionName}</span>
                    </section>
                    <span id="option-selected">{item.optionSelected}</span>
                  </section>
                )
              )}
            </section>
          )}
        </section>
        <section className="setting">
          <section
            onClick={() => setShowDeleteOptions((prev) => !prev)}
            className="option-main"
          >
            <span className="setting-name">Delete Note</span>
            <section className="plus-minus-icon" id="delete-icon">
              {showDeleteOptions ? <FaMinus /> : <FaPlus />}
            </section>
          </section>
          {showDeleteOptions && (
            <section className="delete-dropdown">
                <span>Move to Trash</span>
                <button onClick={handleMoveToTrash} id="trash-button">Trash</button>
                <span>Delete Permanently</span>
                <button onClick={handleDeletePermanently} id="delete-button">Delete</button>
            </section>
          )}
        </section>
      </div>
    </div>
  );
};

export default NoteSettings;
