import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Room from "../pages/Room";
import RoomLogin from "../pages/RoomLogin";
import Blog from "../pages/Blog";

function Layout() {
  return (
    <>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
         <Route path="/login" element={<Login/>} />
         <Route path="/room" element = {<Room/>} />
         <Route path="/roomlogin" element = {<RoomLogin/>} />
         <Route path="/blog" element = {<Blog/>} />
      </Routes>
    </>
  );
}

export default Layout;