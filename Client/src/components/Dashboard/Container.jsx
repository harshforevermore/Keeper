import Sidepanel from "../Sidepanel/Sidepanel";
import Body from "./Body";
import "../../styles/dashboard/container.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const container = () => {
  const [showSidepanel, setShowSidepanel] = useState(true);
  return (
    <div className="container-container">
      <div className="sidepanel">
        <Sidepanel
          showSidepanel={showSidepanel}
          setShowSidepanel={setShowSidepanel}
        />
        <RxHamburgerMenu
          className={`sidepanel-hamburger-icon ${
            !showSidepanel ? "show-hamburger-icon" : "hide-hamburger-icon"
          }`}
          onClick={() => setShowSidepanel(true)}
          title="Show Access Bar"
        />
      </div>
      {/* <div className="body-container"> */}
        <Body />
      {/* </div> */}
    </div>
  );
};

export default container;
