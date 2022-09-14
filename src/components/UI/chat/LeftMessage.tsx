import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
type LeftMessageType = {
  displayName: string;
  time: string;
  text: string;
};
const LeftMessage: React.FC<LeftMessageType> = ({ displayName, text, time }) => {
  //@ts-ignore
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return (
    <div
      style={{ display: "flex", alignItems: "center", padding: "5px 10px", background: "#cbbfb3", borderRadius: "10px", width: "80%", flexWrap: "wrap", margin: "10px", borderTopLeftRadius: "0px" }}
    >
      <div style={{ marginRight: "20px" }}>{<Avatar size="large" icon={<UserOutlined />} />}</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: "12px" }}>
        <div>{displayName}</div>
        <div>{text}</div>
        <div style={{ fontSize: "10px" }}>
          <div>{formattedTime}</div>
        </div>
      </div>
    </div>
  );
};

export default LeftMessage;
