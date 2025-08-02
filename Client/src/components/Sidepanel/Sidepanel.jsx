import "../../styles/Sidepanel/Sidepanel.css";
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

const Sidepanel = ({showSidepanel, setShowSidepanel}) => {
  const [isPrivateExpanded, setIsPrivateExpanded] = useState(false);
  const [isSharedExpanded, setIsSharedExpanded] = useState(false);
  const [isPrivateHovered, setIsPrivateHovered] = useState(false);
  const [isSharedHovered, setIsSharedHovered] = useState(false);
  const [username, setUsername] = useState("username");

  const {userPublicId} = useContext(AuthContext);
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
            <section className={`head-icons ${isPrivateHovered && "display-head-icons"}`}>
              <IoIosArrowDown className={`head-expand-collapse ${isPrivateExpanded && "collapse"}`} onClick={() => setIsPrivateExpanded(!isPrivateExpanded)} />
              <GoPlus className="head-plus-icon" title="Add New Note" />
            </section>
          </section>
          <section id="private-notes">
            <section className="notes-heading"></section>
            <section className="new-note-btn">
              <GoPlus className="add-new-plus-icon" />
              <span>Add New</span>
            </section>
          </section>
        </div>
        <div className="shared-notes" onMouseOver={() => setIsSharedHovered(true)} onMouseOut={()=> setIsSharedHovered(false)} >
          <section className="note-head">
            <h6 id="shared-heading">Shared</h6>
            <section className={`head-icons ${isSharedHovered && "display-head-icons"}`}>
              <IoIosArrowDown className={`head-expand-collapse ${isSharedExpanded && "collapse"}`} onClick={() => setIsSharedExpanded(!isSharedExpanded)} />
              <GoPlus className="head-plus-icon" title="Add New Note" />
            </section>
          </section>
          <section id="shared-notes">
            <section className="notes-heading"></section>
            <section className="new-note-btn">
              <GoPlus className="add-new-plus-icon" />
              <span>Add New</span>
            </section>
          </section>
        </div>
      </div>
      <div className="controls">
        <section id="trash-section">
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
