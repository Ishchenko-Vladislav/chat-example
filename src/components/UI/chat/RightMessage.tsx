import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
type RightMessageType = {
  displayName: string;
  time: any;
  text: string;
};
const RightMessage: React.FC<RightMessageType> = ({ displayName, text, time }) => {
  //@ts-ignore
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 10px",
        background: "#767676",
        borderRadius: "10px",
        flexWrap: "wrap",
        width: "80%",
        justifyContent: "right",
        margin: "10px",
        marginLeft: "auto",
        borderTopRightRadius: "0",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", fontSize: "12px" }}>
        <div>{displayName}</div>
        <div>{text}</div>
        <div style={{ fontSize: "10px" }}>{formattedTime}</div>
      </div>
      <div style={{ marginLeft: "20px" }}>{<Avatar size="large" icon={<UserOutlined />} />}</div>
    </div>
  );
};

export default RightMessage;
