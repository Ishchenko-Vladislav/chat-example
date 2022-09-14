import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { firestore } from "./../../firebase-config";
// import { doc, onSnapshot } from "firebase/firestore";
import { addDoc, collection, getDocs, onSnapshot, doc, query } from "firebase/firestore";

export const useDB = () => {
  return {};
};
