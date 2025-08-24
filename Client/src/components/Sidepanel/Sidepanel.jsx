import { FaRegUser } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { PiTrashSimple } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axiosClient from "../../API/axiosClient";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../../Context/NotesContext";
import "../../styles/Sidepanel/Sidepanel.css";

const Sidepanel = ({showSidepanel, setShowSidepanel}) => {
  const [isPrivateExpanded, setIsPrivateExpanded] = useState(false);
  const [isSharedExpanded, setIsSharedExpanded] = useState(false);
  const [isPublicExpanded, setIsPublicExpanded] = useState(false);
  const [isPrivateHovered, setIsPrivateHovered] = useState(false);
  const [isSharedHovered, setIsSharedHovered] = useState(false);
  const [isPublicHovered, setIsPublicHovered] = useState(false);
  const [username, setUsername] = useState("username");

  const {userPublicId} = useContext(AuthContext);
  const {userNotes} = useNotes();
  
  const navigate = useNavigate();

  const getUsername = async (id) => {
    try{
      const data = {publicId: id};
      const res = await axiosClient.post("/u/getUsername", data);
      setUsername(res?.data?.username || "Username");
    }
    catch(error) {
      console.error("Error occured while getting username: ", error.message);
    }
  }
  useEffect(() => {
    if(userPublicId) {
      getUsername(userPublicId);
    }
  }, [userPublicId]);

  const notesDesc = {
    private: userNotes.filter((note) => note.visibility === "Private" && !note.isTrashed) || [],
    shared: userNotes.filter((note) => note.visibility === "Shared" && !note.isTrashed) || [],
    public: userNotes.filter((note) => note.visibility === "Public" && !note.isTrashed) || [],
  }

  const handleNew = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "new-private" :
        navigate("/Private/new");
        break;
      case "new-shared" :
        navigate("/Shared/new");
        break;
      case "new-public" :
        navigate("/Public/new");
        break;
    }
  };

  return (
    <div className={`sidepanel-container ${!showSidepanel ? "hide-sidepanel" : "show-sidepanel"}`}>
      <div className="user-sec">
        <div className="profile">
          <div className="profile-icon-name">
            <FaRegUser id="user-icon" />
            <span>{username}</span>
          </div>
          <div className="collapse-sidepanel">
            <TbLayoutSidebarLeftCollapse id="collapse-sidepanel-icon" onClick={() => setShowSidepanel(false)} title="Close" />
          </div>
        </div>
      </div>
      <div className="notes-desc-container">
        <div className="private-notes" onMouseOver={() => setIsPrivateHovered(true)} onMouseOut={()=> setIsPrivateHovered(false)} >
          <section className="note-head">
            <h6 id="private-heading">Private</h6>
            <section className={`head-icons ${(isPrivateHovered || !isPrivateExpanded) && "display-head-icons"}`}>
              <IoIosArrowDown className={`head-expand-collapse ${isPrivateExpanded && "collapse"}`} onClick={() => setIsPrivateExpanded((prev) => !prev)} />
              <GoPlus className="head-plus-icon" title="Add New Note" />
            </section>
          </section>
          {isPrivateExpanded && <section id="private-notes">
            <section className="notes-heading">
              {
                notesDesc["private"].length > 0 && notesDesc["private"]?.map((item) => (
                  <section key={item?.noteId} onClick={() => navigate(`/note/${item?.noteId}/selected`)} className="note-desc">
                    <span className="heading">{item?.title}</span>
                  </section>
                ))
              }
            </section>
            <section onClick={handleNew} id="new-private" className="new-note-btn">
              <GoPlus className="add-new-plus-icon" />
              <span>Add New</span>
            </section>
          </section>}
        </div>
        <div className="shared-notes" onMouseOver={() => setIsSharedHovered(true)} onMouseOut={()=> setIsSharedHovered(false)} >
          <section className="note-head">
            <h6 id="shared-heading">Shared</h6>
            <section className={`head-icons ${(isSharedHovered || !isSharedExpanded) && "display-head-icons"}`}>
              <IoIosArrowDown className={`head-expand-collapse ${isSharedExpanded && "collapse"}`} onClick={() => setIsSharedExpanded((prev) => !prev)} />
              <GoPlus className="head-plus-icon" title="Add New Note" />
            </section>
          </section>
          {isSharedExpanded && <section id="shared-notes">
            <section className="notes-heading">
              {
                notesDesc["shared"].length > 0 && notesDesc["shared"]?.map((item) => (
                  <section key={item?.noteId} onClick={() => navigate(`/note/${item?.noteId}/selected`)} className="note-desc">
                    <span className="heading">{item?.title}</span>
                  </section>
                ))
              }
            </section>
            <section onClick={handleNew} id="new-shared" className="new-note-btn">
              <GoPlus className="add-new-plus-icon" />
              <span>Add New</span>
            </section>
          </section>}
        </div>
        <div className="public-notes" onMouseOver={() => setIsPublicHovered(true)} onMouseOut={()=> setIsPublicHovered(false)} >
          <section className="note-head">
            <h6 id="public-heading">Public</h6>
            <section className={`head-icons ${(isPublicHovered || !isPublicExpanded) && "display-head-icons"}`}>
              <IoIosArrowDown className={`head-expand-collapse ${isPublicExpanded && "collapse"}`} onClick={() => setIsPublicExpanded((prev) => !prev)} />
              <GoPlus className="head-plus-icon" title="Add New Note" />
            </section>
          </section>
          {isPublicExpanded && <section id="public-notes">
            <section className="notes-heading">
              {
                notesDesc["public"].length > 0 && notesDesc["public"]?.map((item) => (
                  <section key={item?.noteId} onClick={() => navigate(`/note/${item?.noteId}/selected`)} className="note-desc">
                    <span className="heading">{item?.title}</span>
                  </section>
                ))
              }
            </section>
            <section onClick={handleNew} id="new-public" className="new-note-btn">
              <GoPlus className="add-new-plus-icon" />
              <span>Add New</span>
            </section>
          </section>}
        </div>
      </div>
      <div className="controls">
        <section onClick={() => navigate("/trash")} id="trash-section">
          <PiTrashSimple id="trash-icon" className="control-icon" />
          <span className="icon-name">Trash</span>
        </section>
        <hr className="hr-partition" />
        <section id="settings-section">
          <LuSettings id="settings-icon" className="control-icon" />
          <span className="icon-name">Settings</span>
        </section>
      </div>
      <div className="misc">
        <div className="help-contact">
          <BsQuestionCircle id="question-mark-icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidepanel;
