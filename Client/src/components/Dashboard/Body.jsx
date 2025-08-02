import InputArea from "../InputArea";
import Note from "../Note Components/Note";
import "../../styles/body.css";
import Masonry from "react-masonry-css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNotification } from "../../Context/Notification/NotificationContext";
import axiosClient from "../../API/axiosClient";

const Body = () => {
  const { userPublicId } = useContext(AuthContext);
  const showNotification = useNotification();

  const [data, setData] = useState([]);

  // const getNotes = async (userPublicId) => {
  //   try{
  //     const res = await axiosClient.post("");
  //   }
  //   catch(error) {
  //     console.error("Error occured while getting notes: ", error.message);
  //   }
  // }
  // useEffect(() => {
  // //Get the user notes

  // }, [userPublicId]);

  // const addNewNote = async (note) => {
  //   try{
  //     const res = await axiosClient.post("")
  //   }
  //   catch(error) {
  //     console.error("Error occured while creating new note: ", error.message);
  //   }
  // };
  useEffect(() => {
    if (!userPublicId) {
      const userNotes = JSON.parse(localStorage.getItem("userNotes"));
      if (userNotes) {
        setData(userNotes);
      }
    }
  }, []);

  useEffect(() => {
    if (!userPublicId && data.length > 0) {
      localStorage.setItem("userNotes", JSON.stringify(data));
    }
  }, [data]);

  function addData(getData) {
    if (!userPublicId) {
      showNotification(
        "Your Notes are being saved locally, Login to save on server.",
        "info"
      );
      const tempUniqueId = crypto.randomUUID();
      const localNote = {
        noteId: tempUniqueId,
        ...getData,
        noteBG: "#f0f0f0",
        isSynced: false,
      };
      setData([localNote, ...data]);
    } else {
      setData([getData, ...data]);
    }
  }
  function deleteData(id) {
    setData((prevValue) => {
      return prevValue.filter((item, index) => {
        return index !== id;
      });
    });
  }
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const updateNote = (noteId, newTitle, newDetails) => {
    setData((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === noteId
          ? { ...note, title: newTitle, description: newDetails }
          : note
      )
    );
  };
  const updateNoteBG = (newBG, noteId) => {
    setData((prevNotes) =>
      prevNotes.map((note) =>
        note.noteId === noteId ? { ...note, noteBG: newBG } : note
      )
    );
  };

  return (
    <div className="body">
      <div className={`input-area-container`}>
        <InputArea addData={addData} />
      </div>
      <div id="masonry-wrapper">
        <div id="masonry-scrollable-div">
          {data.length !== 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid-column"
            >
              {data.map((item, index) => (
                <Note
                  key={index}
                  noteId={item?.noteId}
                  update={updateNote}
                  delete={deleteData}
                  heading={item.title}
                  details={item.description}
                  updateNoteBG={updateNoteBG}
                  noteBG={item.noteBG}
                />
              ))}
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
