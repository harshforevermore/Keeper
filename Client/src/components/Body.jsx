import InputArea from "./InputArea";
import Note from "./Note";
import '../styles/body.css';
import Masonry from 'react-masonry-css';
import { useState } from "react";

const Body = () => {
  const notes = [
    {title: "Example Note", description: "these are details related to this note."},
    {title: "Example Note 2", description: "some details related to this note."}
  ];
  const [data, setData] = useState([...notes]);
  function addData(getData) {
    setData([getData, ...data]);
  }
  function deleteData(id) {
    setData(prevValue => {
      return prevValue.filter((item, index) => {
        return index !== id;
      })
    })
  }
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const updateNote = (id, newTitle, newDetails) => {
    setData((prevNotes) => 
      prevNotes.map((note, index) => 
        index === id 
        ? {...note, title: newTitle, description: newDetails}
        : note
      )
    );
  }

  return (
    <div className="body">
      <div className="input-area-container">
        <InputArea addData={addData}/>
      </div>
      <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid notes-container" columnClassName="masonry-grid-column">
        {
          data.map((item, index) => (
            <Note key={index} id={index} {...item} update={updateNote} delete={deleteData} heading={item.title} details={item.description}/>
          ))
        }
      </Masonry>
    </div>
  );
};

export default Body;