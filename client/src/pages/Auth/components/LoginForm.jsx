import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../core/remote/request";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../index.css";
import { setUser } from "../../../redux/userSlice/userReducer";

const LoginForm = ({ setLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (email == "" || password == "") {
      setError("Please fill empty fields");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    if (validateForm()) {
      let data = new FormData();
      data.append("email", email);
      data.append("password", password);
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const res = await sendRequest("POST", "/api/login", data, headers);
        if ((res.status = 200)) {
          window.localStorage.setItem("token", res.data.authorisation.token);
          dispatch(setUser(res.data.user));
          console.log("sign in successfull");
          navigate("/Home");
        }
      } catch (error) {
        console.log(error);
        setError(error.res.data.message);
      }
    }
  };

  return (
    <div className="flex column align-center">
      <div className="flex column align-center justify-around bg-white form ">
        <h1 className="text-black">Instagram</h1>
        <form className="flex column big-gap p form-container align-center">
          <input
            type="email"
            label="Email address"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            label="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className=" flex column align-center big-gap">
            <div className="flex">
              <input type="checkbox" value="" defaultChecked />
              <label className="text-black">Remember me</label>
            </div>
            <a href="#!">Terms and conditions</a>
          </div>
          <button
            className="btn-style bg-blue text-white bold"
            onClick={handleLogin}
            type="button"
          >
            Sign in
          </button>
          <div className="flex gap">
            <p className="text-black">Don't have an account?</p>
            <span
              className=" text-blue cursor-pointer bold"
              onClick={() => setLogin(false)}
            >
              Sign up
            </span>
          </div>
          {error && <small className="text-red">{error}</small>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
