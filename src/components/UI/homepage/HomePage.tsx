import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/auth";
import style from "./HomePage.module.css";
import { Sidebar } from "./sidebar";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";

const HomePage = () => {
  // let navigate = useNavigate();
  const { user } = useAuth();
  // const user = false;
  // useEffect((): any => {
  //   if (!user) {
  //     // navigate("/login");
  //   }
  // }, []);
  return (
    <div>
      <header className={style.header}>
        <div>HomePage</div>
        <div className={style.blockInfo}>
          <div className={style.avatar}>
            <div>
              <img src="https://cdn-icons-png.flaticon.com/512/482/482636.png" alt="avatar" />
            </div>
          </div>
          <div className={style.block}>
            {user.email}
            <button onClick={() => signOut(auth)} className={style.blockButton}>
              logout
            </button>
          </div>
        </div>
      </header>
      <div style={{ width: "1200px", margin: "0 auto", display: "flex", height: "100%" }}>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { HomePage };
