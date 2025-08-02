import Sidepanel from "../Sidepanel/Sidepanel";
import "../../styles/dashboard/container.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const container = () => {
  const [showSidepanel, setShowSidepanel] = useState(false);
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
      <Outlet />
    </div>
  );
};

export default container;
