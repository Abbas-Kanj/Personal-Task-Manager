import React, { useState } from "react";
// import { sendRequest } from "../../../core/remote/request";
import "../index.css";

const SignUpForm = ({ setLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (email == "" || password == "" || username == "") {
      setError("Please fill empty fields");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSignup = async () => {
    if (validateForm()) {
      let data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      try {
        const headers = { "Content-Type": "multipart/form-data" };
        const res = await sendRequest("POST", "/api/register", data, headers);
        console.log(res.data);
        if ((res.status = 200)) {
          window.localStorage.setItem("token", res.data.authorisation.token);
          console.log("sign up successfull");
          setLogin(true);
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex column align-center">
      <div className="flex column align-center justify-around bg-white form ">
        <h1 className="text-black">Instagram</h1>
        <form className="flex column big-gap p form-container align-center">
          <input
            type="text"
            label="Username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
            onClick={handleSignup}
            type="button"
          >
            Sign up
          </button>
          <div className="flex gap">
            <p className="text-black">Already have an account?</p>
            <span
              className=" text-blue cursor-pointer bold"
              onClick={() => setLogin(true)}
            >
              Sign in
            </span>
          </div>
          {error && <small className="text-red">{error}</small>}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
