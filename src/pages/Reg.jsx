/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/Reg.css";
import API_URL from "../../global/config";

function Reg() {
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    phno: "",
    Address: "",
  });

  // console.log("data : ", data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.phno.length == 10) {
      try {
        const response = await axios.post(`${API_URL}signup/verify`, data);
        console.log(response);

        if (response.data === false) {
          alert("Email already exist");
        } else if (response.data === true) {
          alert("Check email for verification 'Confirmation link send'");
        }
      } catch (err) {
        console.log(err);
        if (err.message) {
          alert("Network error");
        }
      }
    } else {
      alert("Phno must be length 10");
    }
  };
  return (
    <div className="reg">
      <div className="logo">
        <br />
        <Link to="/">
          <p>Logo</p>
        </Link>
      </div>
      <div className="reg_container">
        <h1>&nbsp;Create Account</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => {
              setData({
                ...data,
                name: e.target.value,
              });
            }}
            placeholder="First and Lastname"
            required
          />

          <label htmlFor="age">Age </label>
          <input
            type="text"
            name="age"
            value={data.age}
            onChange={(e) => {
              setData({
                ...data,
                age: e.target.value,
              });
            }}
            placeholder="Enter age"
            required
          />

          <label htmlFor="email">Email :</label>
          <input
            type="text"
            name="email"
            value={data.email}
            placeholder="Enter email"
            onChange={(e) => {
              setData({
                ...data,
                email: e.target.value,
              });
            }}
            required
          />

          <label htmlFor="pass">Password :</label>
          <input
            type="password"
            name="pass"
            value={data.password}
            onChange={(e) => {
              setData({
                ...data,
                password: e.target.value,
              });
            }}
            placeholder="At least 6 characters"
            required
          />

          <label htmlFor="phno">Mobile no :</label>
          <input
            type="number"
            name="phno"
            value={data.phno}
            onChange={(e) => {
              setData({
                ...data,
                phno: e.target.value,
              });
            }}
            placeholder="Mobile number eg : (+9196********)"
            required
          />

          <label htmlFor="address">Address : </label>
          <br />
          <textarea
            name="Address"
            value={data.Address}
            onChange={(e) => {
              setData({
                ...data,
                Address: e.target.value,
              });
            }}
            placeholder="Enter your address"
            required
          ></textarea>

          <br />

          <button type="submit" className="signup">
            Verify Email
          </button>
          <br />
        </form>
        <br />
        <Link className="register" to="/login">
          Already has account
        </Link>
      </div>
    </div>
  );
}

export default Reg;
