import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import useAuth from "../../hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../firebase-config";
type userType = {
  email: string;
  photoURL: string | null;
  phoneNumber: string | number | string;
  displayName: string | null;
  createdAt: number;
  status: string;
};
type ProfileProps = {
  uid?: any;
};
const Profile: React.FC<ProfileProps> = ({ uid }) => {
  const [isSetting, setSetting] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>("");
  const [displayNameInput, setDisplayName] = useState<string>("");
  const [phoneNumberInput, setPhoneNumber] = useState<string>("");
  const [value, loading, error] = useDocumentData(doc(firestore, "users", `${uid}`));
  let date = new Date(value?.createdAt * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  const updateData = async (date: any) => {
    console.log(emailInput, statusInput, displayNameInput, phoneNumberInput);
    await setDoc(doc(firestore, "users", `${uid}`), {
      email: emailInput,
      photoURL: null,
      phoneNumber: phoneNumberInput,
      displayName: displayNameInput,
      createdAt: value?.createdAt,
      status: statusInput,
    });
    setSetting(false);
  };
  useEffect(() => {
    setEmailInput(value?.email);
    setStatusInput(value?.status);
    setDisplayName(value?.displayName);
    setPhoneNumber(value?.phoneNumber);
  }, [isSetting]);

  return !loading ? (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ paddingRight: "15px" }}>
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <div style={{ marginLeft: "40px", display: "flex", flexDirection: "column" }}>
          {isSetting ? (
            <div style={{ fontSize: "20px", marginBottom: "20px", height: "40px" }}>
              <input
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
                defaultValue={value?.displayName}
              ></input>
            </div>
          ) : (
            <div style={{ fontSize: "20px", marginBottom: "20px", height: "40px" }}>{value?.displayName}</div>
          )}
          {isSetting ? (
            <textarea onChange={(e) => setStatusInput(e.target.value)} style={{ height: "50px", marginBottom: "20px" }} defaultValue={value?.status} />
          ) : (
            <div style={{ height: "50px", marginBottom: "20px", width: "100%" }}>{value?.status}</div>
          )}
          <div style={{ display: "grid", gridTemplate: "40px 40px 40px/ 250px", gap: "10px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "40px" }}>Email:</span>
              {isSetting ? <input onChange={(e) => setEmailInput(e.target.value)} style={{ height: "30px" }} defaultValue={value?.email} /> : <div style={{ height: "30px" }}>{value?.email}</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "40px" }}>PhoneNumber:</span>
              {isSetting ? (
                <input
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  style={{ height: "30px" }}
                  defaultValue={value?.phoneNumber}
                />
              ) : (
                <div style={{ height: "30px" }}>{value?.phoneNumber}</div>
              )}
            </div>

            <div>Account created: {formattedTime}</div>
          </div>
        </div>
      </div>
      {isSetting ? (
        <Button type="primary" onClick={updateData}>
          update
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            setSetting(() => !isSetting);
          }}
        >
          setting
        </Button>
      )}
      {isSetting && (
        <Button onClick={() => setSetting(() => !isSetting)} danger type="primary">
          close
        </Button>
      )}
    </div>
  ) : (
    <div>loading ...</div>
  );
};

export { Profile };
