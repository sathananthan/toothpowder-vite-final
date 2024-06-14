/*eslint-disable*/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
/* import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"; */
import "../style/Login.css";
import API_URL from "../../global/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}signin`, {
        email,
        password,
      });
      // console.log(response);
      if (response.data === "Server Busy (invalid email)") {
        alert("Check your email (Email account not found)");
      } else if (response.data === "Invalid Username or (Password)") {
        alert("Wrong password");
      } else if (response?.status) {
        localStorage.setItem("UserInfo", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err.message) {
        alert("Network error");
      }
    }
  };

  /* const register = (e) => {
    e.preventDefault();

     createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message)); 
  }; */
  return (
    <div className="login">
      <div className="logo">
        <br />
        <Link to="/">
          <p>Logo</p>
        </Link>
      </div>
      <div className="login_container">
        <h1>&nbsp;Sign in</h1>
        <form onSubmit={signIn}>
          <label htmlFor="mail">Email :</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="pass">Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin">
            Sign In
          </button>
        </form>

        <p>
          By continuing, you agree to Ncs's Conditions of Use and Privacy
          Notice.
        </p>

        <Link to="/reg" className="register">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
