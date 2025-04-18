import { MdDelete } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { IoMdColorFill } from "react-icons/io";
import "../styles/note.css";
import Colors from "../data/data";
import { useEffect, useRef, useState } from "react";

const Note = (props) => {
  const [showColorPallete, setShowColorPallete] = useState(false);
  const [noteBackground, setNoteBackground] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [showFeatureIcons, setShowFeatureIcons] = useState(false);
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [titleChange, setTitleChange] = useState("");
  const [paraChange, setParaChange] = useState("");

  const noteRef = useRef(null);

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
        setExpand(false);
      }
    }

    if (expand) {
      document.addEventListener("click", handleClickOutsideNote);
    }
    return () => {
      document.removeEventListener("click", handleClickOutsideNote);
    };
  }, [expand]);

  useEffect(() => {
    setTextColor(getTextColor(noteBackground));
  }, [noteBackground]);

  function handleEditNote() {
    setTitleChange(props.heading);
    setParaChange(props.details);
  }

  return (
    <div
      ref={noteRef}
      className={`grid-item note ${expand ? "focus-note" : ""}`}
      onMouseOver={() => setShowFeatureIcons(true)}
      onMouseOut={() => setShowFeatureIcons(false)}
      onClick={() => setExpand(true)}
      style={{ backgroundColor: noteBackground, color: textColor }}
    >
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
            setExpand(false);
            props.update(props.id, titleChange, paraChange);
          }}
          className="button-style save-edit-button"
        >
          Save
        </button>
      ) : null}
      {!edit && (
        <div
          className="feature-icons"
          style={showFeatureIcons ? { opacity: 1 } : { opacity: 0 }}
        >
          <MdDelete
            onClick={() => {
              props.delete(props.id);
            }}
            className="icons"
          />
          <IoColorPaletteOutline
            onClick={(e) => {
              e.stopPropagation();
              setShowColorPallete(!showColorPallete);
            }}
            className="icons"
          />
          <GoPencil
            onClick={(e) => {
              e.stopPropagation();
              handleEditNote();
              setExpand(true);
              setEdit(true);
            }}
            className="icons"
          />
        </div>
      )}
      <div
        className={`color-pallete ${
          showColorPallete ? null : "hide-color-pallete"
        }`}
      >
        <div className="predefined-colors">
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
  );
};
export default Note;
