import React, { useState } from "react";
import { FormLogin } from "../FormLogin/FormLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { PopUpError } from "../popUpError/PopUpError";

const Login = () => {
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const loginHandler = (values: any) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => navigate("/"))
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
      });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
      <PopUpError isError={isError} errorMessage={errorMessage} />
      <h1>Login</h1>
      <FormLogin callback={loginHandler} title="login" />
    </div>
  );
};

export { Login };
