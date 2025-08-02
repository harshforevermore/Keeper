import { Routes, Route } from "react-router-dom";
import Container from "../components/Dashboard/Container";
import Body from "../components/Dashboard/Body";
import Login from "../components/Login";
import Register from "../components/Register";
import NoteSettings from "../components/Note Components/NoteSettings";

const RouterNav = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/note/:id" element={<NoteSettings />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterNav;
