let notifyFn = null;

export const setNotificationHandler = (fn) => {
  notifyFn = fn;
};

export const notify = (message, type = "info") => {
  if (notifyFn) {
    notifyFn({ message, type });
  } else {
    console.warn("Notification handler not set yet");
  }
};