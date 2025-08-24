import { createContext, useContext, useState, useEffect, useRef } from "react";
import Notification from "../../components/Feedback/Notification";
import { setNotificationHandler } from "./notificationService";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const timeout = 4000;
  const exitDuration = 500;

  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null); // { message, type }
  const [isLeaving, setIsLeaving] = useState(false);
  const timeoutRef = useRef(null);

  // Public function to enqueue a notification
  const showNotification = (message, type) => {
    setQueue((prev) => [...prev, { message, type }]);
  };

  // Hook global handler
  useEffect(() => {
    setNotificationHandler(({ message, type }) => {
      showNotification(message, type);
    });
  }, []);

  // Handle showing the next notification from queue
  useEffect(() => {
    if (!current && queue.length > 0) {
      const next = queue[0];
      setQueue((q) => q.slice(1));
      setCurrent(next);
      setIsLeaving(false);

      timeoutRef.current = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(() => {
          setCurrent(null);
          setIsLeaving(false);
        }, exitDuration);
      }, timeout);
    }
  }, [queue, current]);

  // Manual close (via close icon)
  const handleClose = () => {
    clearTimeout(timeoutRef.current);
    setIsLeaving(true);
    setTimeout(() => {
      setCurrent(null);
      setIsLeaving(false);
    }, exitDuration);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {current && (
        <Notification
          notificationText={current.message}
          type={current.type}
          isLeaving={isLeaving}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;