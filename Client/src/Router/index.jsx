import { Routes, Route } from "react-router-dom";
import Container from "../components/Dashboard/Container";
import Body from "../components/Dashboard/Body";
import Login from "../components/Login";
import Register from "../components/Register";
import NoteSettings from "../components/Note Components/NoteSettings";
import Trash from "../components/SidepanelNavComponents/Trash";
import SelectedNote from "../components/Note Components/SelectedNote";
import FixedInputArea from "../components/Input Area/FixedInputArea";

const RouterNav = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/note/:id/settings" element={<NoteSettings />} />
          <Route path="/note/:id/selected" element={<SelectedNote />} />
          <Route path="/:visibility/new" element={<FixedInputArea />} />
          <Route path="/trash" element={<Trash />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterNav;
