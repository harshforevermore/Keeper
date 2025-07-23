import { Routes, Route } from "react-router-dom";
import Container from "../components/Dashboard/Container";
import Login from "../components/Login";
import Register from "../components/Register";

const RouterNav = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
      </Routes>
    </>
  );
};

export default RouterNav;