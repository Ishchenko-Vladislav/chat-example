import React from "react";
import style from "./HomePage.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // const navigate = useNavigate();
  return (
    <div className={style.sidebar}>
      <nav className={style.navBar}>
        <Link to="profile">profile</Link>
        <Link to="chat">chat</Link>
      </nav>
    </div>
  );
};

export { Sidebar };
