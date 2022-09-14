import { Button } from "antd/lib";
import React, { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/auth";
import { addDoc, collection, query, serverTimestamp, orderBy, Timestamp, doc } from "firebase/firestore";
import { app, firestore } from "../../../firebase-config";
import style from "./chat.module.css";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";
// import { useDB } from "../../hooks/database";
type ChatType = {
  uid: string;
};
const Chat: React.FC<ChatType> = ({ uid }) => {
  const { user } = useAuth();
  const q = query(collection(firestore, "messages"), orderBy("createdAt"));
  const [val, load, err] = useDocumentData(doc(firestore, "users", `${uid}`));
  const messageIntoViev = useRef<null | HTMLDivElement>(null);
  //ts-ignore
  const [messages, loading, error, snapshot] = useCollectionData<any>(q);
  //@ts-ignore
  const value = useRef<LegacyRef<HTMLInputElement> | undefined>("");
  //@ts-ignore
  const sendMessage = async (e) => {
    e.preventDefault();
    //@ts-ignore
    if (value.current.value.length === 0) {
      return;
    }
    const docRef = await addDoc(collection(firestore, "messages"), {
      text: value.current.value,
      uid: user.uid,
      displayName: val?.displayName,
      createdAt: Timestamp.now().seconds,
    });
    value.current.value = "";
  };
  useEffect(() => {
    //ts-ignore
    // scrollTo(messageIntoViev.current);
    messageIntoViev?.current?.scrollIntoView();
  }, [messages]);

  if (loading) {
    return <div>loading ...</div>;
  }
  return (
    <div>
      <div className={style.blockMessage}>
        {messages?.map((mes: any, index: number) =>
          user.uid === mes.uid ? (
            <RightMessage displayName={mes.displayName || "guest"} text={mes.text} time={mes.createdAt} key={index} />
          ) : (
            <LeftMessage displayName={mes.displayName || "guest"} text={mes.text} time={mes.createdAt} key={index} />
          )
        )}
        <div ref={messageIntoViev} />
      </div>
      <form className={style.form} onSubmit={(e) => sendMessage(e)}>
        {
          //@ts-ignore
        }
        <input className={style.input} ref={value} type="text" />
        <Button onClick={(e) => sendMessage(e)} type="primary">
          send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
