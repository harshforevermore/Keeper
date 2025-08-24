import { FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";
import { BsXCircleFill } from "react-icons/bs";
import "../../styles/Feedback/notification.css";
import { IoCloseOutline } from "react-icons/io5";

const Notification = ({ notificationText, type = "success", isLeaving, onClose }) => {
  const notificationStyles = {
    success: {
      textClass: "success-text",
      bgClass: "success-bg",
      designerDivClass: "success-designer-div",
      icon: <FaCircleCheck className="success-icon" />,
    },
    error: {
      textClass: "error-text",
      bgClass: "error-bg",
      designerDivClass: "error-designer-div",
      icon: <BsXCircleFill className="error-icon" />,
    },
    warning: {
      textClass: "warning-text",
      bgClass: "warning-bg",
      designerDivClass: "warning-designer-div",
      icon: <PiWarningCircleFill className="warning-icon" />,
    },
    info: {
      textClass: "info-text",
      bgClass: "info-bg",
      designerDivClass: "info-designer-div",
      icon: <FaCircleInfo className="info-icon" />,
    },
  };
  return (
    <div
      className={`notification-container ${!isLeaving ? 'visible' : 'invisible'} ${notificationStyles[type]?.bgClass}`}
    >
      <div className={`designer-div ${notificationStyles[type]?.designerDivClass}`}></div>
      <div id="close-notification" onClick={onClose}><IoCloseOutline id="close-notification-icon" /></div>
      <section className="notification-icon">
        {notificationStyles[type]?.icon}
      </section>
      <section id="notification-text">
        <span
          className={`notification-head ${notificationStyles[type]?.textClass}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1) /*type with capitalized first letter.*/}
        </span>
        <p className="notification-text">{notificationText}</p>
      </section>
    </div>
  );
};

export default Notification;
