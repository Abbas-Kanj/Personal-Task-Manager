import React, { useState, useEffect } from "react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router-dom";
import "../../styles/colors.css";
import "../../styles/utilities.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      {isLogin ? (
        <LoginForm setLogin={setIsLogin} />
      ) : (
        <SignUpForm setLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Login;
