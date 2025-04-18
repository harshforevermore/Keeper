import { Routes, Route } from "react-router-dom";
import Body from "../components/Body";
import Login from "../components/Login";
import Register from "../components/Register";

const RouterNav = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
      </Routes>
    </>
  );
};

export default RouterNav;