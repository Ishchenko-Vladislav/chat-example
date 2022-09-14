import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

const styleBlock = {
  width: "300px",
  height: "50px",
  display: "flex",
  flexDirection: "column" as any,
};
const styleInput = {
  border: "none",
  borderBottom: "1px solid grey",
  paddingBottom: "5px",
  fontSize: "17px",
  color: "black",
  width: "100%",
  outline: "none",
  background: "none",
  height: "20px",
};
const styleButton = {
  width: "100%",
  margin: "0 auto",
  height: "40px",
  background: "blue",
  border: "none",
  color: "white",
  letterSpacing: "3px",
  cursor: "pointer",
};
const linkStyle = {
  textDecoration: "none",
  color: "blue",
  marginLeft: "10px",
};
type FormLoginProps = {
  title: string;
  callback: Function;
};
const FormLogin = ({ title, callback }: FormLoginProps) => {
  const Danger = (text: string) => {
    return <span style={{ fontSize: "12px", color: "red" }}>{text}</span>;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => callback(data);
  return (
    <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onSubmit)}>
      <div style={{ ...styleBlock }}>
        <input placeholder="Email" style={styleInput} {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
        {errors.email?.type === "required" && Danger("This field is required")}
        {errors.email?.type === "pattern" && Danger("email invalid")}
      </div>
      <div style={styleBlock}>
        <input style={styleInput} placeholder="Password" {...register("password", { required: true })} />
        {errors.password?.type === "required" && Danger("This field is required")}
      </div>
      {title === "login" ? <button style={styleButton}>Login</button> : <button style={styleButton}>Sign Up</button>}

      {title === "login" ? (
        <div style={{ marginTop: "10px" }}>
          Not Registered?
          <Link style={linkStyle} to="/register">
            Create an account
          </Link>
        </div>
      ) : (
        <div style={{ marginTop: "10px" }}>
          If you have account.
          <Link style={linkStyle} to="/login">
            Login
          </Link>
        </div>
      )}
    </form>
  );
};

export { FormLogin };
