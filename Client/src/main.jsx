import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import NotificationProvider from "./Context/Notification/NotificationContext";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ConfirmProvider } from "./Context/ConfirmContext.jsx";
import NotesProvider from "./Context/NotesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <ConfirmProvider>
          <NotesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </NotesProvider>
        </ConfirmProvider>
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>
);
