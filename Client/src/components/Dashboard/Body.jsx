import InputArea from "../Input Area/InputArea";
import Note from "../Note Components/Note";
import "../../styles/body.css";
import Masonry from "react-masonry-css";
import axiosClient from "../../API/axiosClient";
import { useNotes } from "../../Context/NotesContext";

const Body = () => {
  const { userNotes, addNote, updateNote, updateNoteBG } = useNotes();
  const notes = userNotes.filter((note) => !note?.isTrashed);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="body">
      <div className={`input-area-container`}>
        <InputArea addNote={addNote} />
      </div>
      <div id="masonry-wrapper">
        <div id="masonry-scrollable-div">
          {notes.length !== 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid-column"
            >
              {notes.map(
                (item) =>
                  item?.isTrashed === false && (
                    <Note
                      key={item?.noteId}
                      noteId={item?.noteId}
                      update={updateNote}
                      heading={item.title}
                      details={item.description}
                      updateNoteBG={updateNoteBG}
                      noteBG={item.noteBG}
                      trashed={false}
                    />
                  )
              )}
            </Masonry>
          ) : (
            <span id="no-notes-text">Your Notes Appear Here</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
