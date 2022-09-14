import { auth } from "./../../firebase-config";
import { useState } from "react";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
type userType = {
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | number | string;
  displayName: string | null;
  createdAt: number;
  status: string;
};

const useAuth = () => {
  const [user, setUser] = useState<any>({});
  onAuthStateChanged(auth, (userCredential) => {
    setUser(userCredential);
  });
  return {
    user,
  };
};

export default useAuth;
