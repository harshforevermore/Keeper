import { useState, useEffect } from "react";
import "../../styles/Note/readOnlyNote.css";

const ReadOnlyNote = ({ title, details, noteBG }) => {
  const [textColor, setTextColor] = useState("#000000");
  const getTextColor = (bgColor) => {
    const r = parseInt(bgColor.substring(1, 3), 16);
    const g = parseInt(bgColor.substring(3, 5), 16);
    const b = parseInt(bgColor.substring(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000" : "#fff";
  };
  useEffect(() => {
    if(noteBG) {
        setTextColor(getTextColor(noteBG));
    }
  }, [noteBG]);
  return (
    <div id="read-only-note-container" style={{ background: noteBG }}>
      <section className="title-container">
        <h3 style={{color: textColor}}>{title}</h3>
      </section>
      <section className="details-container">
        <p style={{color: textColor}}>{details}</p>
      </section>
    </div>
  );
};

export default ReadOnlyNote;
