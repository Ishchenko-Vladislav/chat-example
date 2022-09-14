import React, { useState } from "react";
import { FormLogin } from "../FormLogin/FormLogin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../../firebase-config";
import { PopUpError } from "../popUpError/PopUpError";
import { addDoc, collection, setDoc, doc, Timestamp } from "firebase/firestore";
type userType = {
  email: string;
  photoURL: string | null;
  phoneNumber: string | number | string;
  displayName: string | null;
  createdAt: number;
  status: string | null;
};
const Register = () => {
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const createdAcc = async (user: any) => {
    const docRef = await setDoc(doc(firestore, "users", user.uid), {
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName || "guest",
      createdAt: Timestamp.now().seconds,
      status: "add status",
    } as userType);
  };
  const registerHandler = (values: any) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        createdAcc(user.user);
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
      });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
      <PopUpError isError={isError} errorMessage={errorMessage} />

      <h1>Sign Up</h1>
      <FormLogin callback={registerHandler} title="register" />
    </div>
  );
};

export { Register };
