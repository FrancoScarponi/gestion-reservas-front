import React from "react";
import AuthForm from "../components/common/AuthForm";

export const Register = () => {
  return (
    <div className="flex w-full justify-center items-center bg-zinc-800 ">
      <AuthForm isRegister={true}/>
    </div>
  );
};
