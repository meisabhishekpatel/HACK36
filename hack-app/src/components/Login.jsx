import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login with Google</h2>
        <GoogleLogin
          onSuccess={() => {
            navigate("/starttest");
          }}
          onError={() => {
            toast.error("Login failed! Please try again.");
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
