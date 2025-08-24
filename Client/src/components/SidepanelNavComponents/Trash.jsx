import { useNotes } from '../../Context/NotesContext';
import Masonry from "react-masonry-css";
import '../../styles/SidepanelNavComponents/trash.css';
import Note from '../Note Components/Note';

const Trash = () => {
  const {userNotes} = useNotes();
  const trashed = userNotes.filter((note) => note.isTrashed);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <div id="trash-container">
      <section id="trash-heading">
        <h1>Trash</h1>
      </section>
      <section id="trashed-notes">
        <div id="masonry-scrollable-div">
          {trashed.length !== 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid-column"
            >
              {trashed.map(
                (item) =>
                  (
                    <Note
                      key={item?.noteId}
                      noteId={item?.noteId}
                      heading={item.title}
                      details={item.description}
                      noteBG={item.noteBG}
                      trashed={true}
                    />
                  )
              )}
            </Masonry>
          ) : (
            <span id="no-notes-text">No Trashed Notes</span>
          )}
        </div>
      </section>
    </div>
  )
};

export default Trash;