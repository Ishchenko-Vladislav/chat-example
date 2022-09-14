import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./components/UI/homepage/HomePage";
import { Login } from "./components/UI/login/Login";
import { Register } from "./components/UI/register/Register";
import { Profile } from "./components/UI/profile/Profile";
import useAuth from "./components/hooks/auth";
import Chat from "./components/UI/chat/Chat";
import "antd/dist/antd.css";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<HomePage />}>
          <Route path="profile" element={<Profile uid={`${user.uid}`} />} />
          <Route path="chat" element={<Chat uid={`${user.uid}`} />} />
        </Route>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
