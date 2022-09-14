import React from "react";
type PopUpErrorProps = {
  errorMessage?: any;
  isError?: boolean;
};
const PopUpError = ({ errorMessage, isError }: PopUpErrorProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        width: "400px",
        height: "40px",
        //   background: "red",
        borderRadius: "2px",
        color: "white",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "RGBA(255,76,76,0.72)",
        transform: `${!isError ? "translateY(-200%)" : "translateY(0%)"}`,
        transition: "all 0.3s",
      }}
    >
      <div>{errorMessage}</div>
    </div>
  );
};

export { PopUpError };
