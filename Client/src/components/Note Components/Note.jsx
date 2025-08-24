import { IoCloseOutline, IoColorPaletteOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { IoMdColorFill } from "react-icons/io";
import { PiShareFatFill } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineNotes, MdRestore, MdDelete } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Colors from "../../data/data";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Note/note.css";
import { useNotes } from "../../Context/NotesContext";
import { useConfirm } from "../../Context/ConfirmContext";

const Note = (props) => {
  const [showColorPallete, setShowColorPallete] = useState(false);
  const [noteBackground, setNoteBackground] = useState(
    props?.noteBG || "#f0f0f0"
  );
  const [textColor, setTextColor] = useState("#000000");
  const [showFeatureIcons, setShowFeatureIcons] = useState(false);
  const [focused, setFocused] = useState(false);
  const [edit, setEdit] = useState(false);
  const [titleChange, setTitleChange] = useState("");
  const [paraChange, setParaChange] = useState("");
  const [showMeta, setShowMeta] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showTrashOptions, setShowTrashOptions] = useState(false);

  const { userPublicId } = useContext(AuthContext);
  const { restoreNote, deleteNote } = useNotes();
  const {confirm} = useConfirm();

  const navigate = useNavigate();

  const noteRef = useRef(null);
  const palleteRef = useRef(null);
  const palleteIconRef = useRef(null);

  const moreOptions = [
    {
      id: 1,
      name: "Share",
      icon: <PiShareFatFill className="icons" title="Share" />,
      onClickFn: () => {
        console.log("Share Note");
      },
    },
    {
      id: 2,
      name: "Settings",
      icon: <LuSettings className="icons" title="Show Settings" />,
      onClickFn: () => {
        navigate(`/note/${props.noteId}/settings`);
      },
    },
  ];

  const togglePallete = (e) => {
    e.stopPropagation();
    setShowColorPallete((prev) => !prev);
  };
  useEffect(() => {
    setNoteBackground(props.noteBG);
  }, [props.noteBG]);
  useEffect(() => {
    if (noteBackground && !props.trashed) {
      const timeout = setTimeout(() => {
        props.updateNoteBG(noteBackground, props.noteId);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [noteBackground]);

  useEffect(() => {
    //useEffect to handle the color pallete
    const handleClickOutside = (event) => {
      if (
        palleteRef.current &&
        !palleteRef.current.contains(event.target) &&
        !palleteIconRef?.current?.contains(event.target)
      ) {
        setShowColorPallete(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getTextColor = (bgColor) => {
    const r = parseInt(bgColor.substring(1, 3), 16);
    const g = parseInt(bgColor.substring(3, 5), 16);
    const b = parseInt(bgColor.substring(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000" : "#fff";
  };

  useEffect(() => {
    function handleClickOutsideNote(e) {
      if (noteRef.current && !noteRef.current.contains(e.target)) {
        setFocused(false);
      }
    }

    if (focused) {
      document.addEventListener("click", handleClickOutsideNote);
    }
    return () => {
      document.removeEventListener("click", handleClickOutsideNote);
    };
  }, [focused]);

  useEffect(() => {
    if (noteBackground) {
      setTextColor(getTextColor(noteBackground));
    }
  }, [noteBackground]);

  function handleEditNote() {
    setTitleChange(props.heading);
    setParaChange(props.details);
  }

  async function handleDeletePermanently() {
    const confirmDelete = await confirm("Delete this note permanently?");
    if(confirmDelete) {
      deleteNote(props.noteId);
    }
  }

  return (
    <div className="note-container">
      <div
        className={`blur-backdrop ${focused ? "active" : ""}`}
        onClick={() => setFocused(false)}
      ></div>
      {userPublicId && !showMeta && (
        <div
          id="note-show-meta"
          onClick={(e) => {
            e.stopPropagation();
            setShowMeta(true);
          }}
        >
          <MdOutlineNotes id="note-show-meta-icon" />
        </div>
      )}
      {props.trashed && (
          <div id={`trashed-three-dots`}>
            <section onClick={() => setShowTrashOptions((prev) => !prev)} id="icon-section">
              <span id="three-dot-icon" style={{color: textColor}}>
                <BsThreeDotsVertical />
              </span>
            </section>
            {showTrashOptions && <section id="trash-options">
              <section onClick={() => restoreNote(props.noteId)} className="option">
                <span><MdRestore /></span>
                <span>Restore</span>
              </section>
              <hr id="trash-option-hr" />
              <section onClick={handleDeletePermanently} className="option">
                <span><MdDelete /></span>
                <span>Delete</span>
              </section>
            </section>}
          </div>
        )}
      <div
        ref={noteRef}
        className={`grid-item note ${focused ? "focus-note" : ""}`}
        onMouseOver={() => setShowFeatureIcons(true)}
        onMouseOut={() => setShowFeatureIcons(false)}
        onClick={() => setFocused(true)}
        style={{ backgroundColor: noteBackground, color: textColor }}
      >
        <div className={`note-meta ${showMeta ? "show-meta" : "hide-meta"}`}>
          {!props.trashed && showMeta && (
            <div
              id="close-meta"
              onClick={(e) => {
                e.stopPropagation();
                setShowMeta(false);
              }}
            >
              <IoCloseOutline id="close-meta-icon" />
            </div>
          )}
          <h4 id="note-meta-heading">Note Info</h4>
          <ul>
            <li id="note-created-at">created at: </li>
            <li id="note-updated-at">updated at: </li>
            <li id="note-access">access: </li>
            <li id="note-access">owner: </li>
          </ul>
        </div>
        {edit ? (
          <input
            id="edit-title"
            onChange={(e) => setTitleChange(e.target.value)}
            value={titleChange}
            style={{ backgroundColor: noteBackground, color: textColor }}
            placeholder="enter title"
          />
        ) : (
          <h3 className="note-heading">{props.heading}</h3>
        )}
        {edit ? (
          <textarea
            id="edit-desc"
            onChange={(e) => setParaChange(e.target.value)}
            value={paraChange}
            style={{ backgroundColor: noteBackground, color: textColor }}
            placeholder="enter description"
          />
        ) : (
          <p className="note-paragraph">{props.details}</p>
        )}
        {edit ? (
          <button
            onClick={() => {
              setEdit(false);
              setFocused(false);
              props.update(props.noteId, titleChange, paraChange);
            }}
            className="button-style save-edit-button"
          >
            Save
          </button>
        ) : null}
        {!props.trashed && !edit && (
          <div
            className="feature-icons-container"
            style={showFeatureIcons ? { opacity: 1 } : { opacity: 0 }}
          >
            <section
              className="feature-icons"
              onClick={(e) => e.stopPropagation()}
            >
              <section
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreOptions((prev) => !prev);
                }}
                id="more-options-container"
              >
                <HiDotsVertical className="icons" title="More" />
                {showMoreOptions && (
                  <section id={`more-options`}>
                    {moreOptions.map((option) => (
                      <React.Fragment key={option.id}>
                        <section onClick={option.onClickFn} className="option">
                          {option.icon}
                          <span>{option.name}</span>
                        </section>
                        <hr className="divide-options" />
                      </React.Fragment>
                    ))}
                  </section>
                )}
              </section>
              <section
                ref={palleteIconRef}
                onClick={(e) => togglePallete(e)}
                className="color-pallete-icon"
              >
                <IoColorPaletteOutline className="icons" title="Select Color" />
              </section>
              <section className="pencil-icon">
                <GoPencil
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditNote();
                    setFocused(true);
                    setEdit(true);
                  }}
                  className="icons"
                  title="Edit Note"
                />
              </section>
            </section>
          </div>
        )}
        <div
          ref={palleteRef}
          className={`${
            showColorPallete ? "color-pallete" : "hide-color-pallete"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="predefined-colors"
          >
            {Colors.map((color) => (
              <div
                key={color.id}
                className="color"
                style={{ background: color.hex }}
                title={color.title}
                onClick={(e) => {
                  e.stopPropagation();
                  setNoteBackground(color.hex);
                }}
              ></div>
            ))}
            <label className="color-picker-container">
              <input
                type="color"
                className="color-picker"
                value={noteBackground}
                onChange={(e) => setNoteBackground(e.target.value)}
              />
              <IoMdColorFill className="color-picker-icon" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Note;
