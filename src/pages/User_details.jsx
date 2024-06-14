/*eslint-disable*/
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateValue } from "../components/StateProvider";
import Navbar1 from "./Navbar1";

function User_details() {
  const [{ user }, basket] = useStateValue();
  const [edit, setEdit] = useState(false);
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

    try {
      const response = await axios.post(`${API_URL}signup/verify`, data);
      console.log(response);

      if (response.data === false) {
        alert("Email already exist");
      } else if (response.data === true) {
        alert("Check email for verification");
      }
    } catch (err) {
      console.log(err);
      if (err.message) {
        alert("Network error");
      }
    }
  };

  return (
    <>
      {/* <Navbar/> */}
      <Navbar1 />
      <div className="reg">
        <br />
        <div className="reg_container">
          <h1>&nbsp;User info</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              name="name"
              value={edit ? data.name : user.name}
              /*  style={!edit ? "{ outline: 'none'}": ""} */
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              placeholder={user.name}
              required
            />

            <label htmlFor="age">Age </label>
            <input
              type="text"
              name="age"
              value={edit ? data.age : user.age}
              onChange={(e) => {
                setData({
                  ...data,
                  age: e.target.value,
                });
              }}
              placeholder={user.age}
              required
            />

            <label htmlFor="email">Email :</label>
            <input
              type="text"
              name="email"
              value={edit ? data.email : user.email}
              placeholder={user.email}
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
              value={edit ? data.password : "******"}
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              placeholder="******"
              required
            />

            <label htmlFor="phno">Mobile no :</label>
            <input
              type="text"
              name="phno"
              value={edit ? data.phno : user.phno}
              onChange={(e) => {
                setData({
                  ...data,
                  phno: e.target.value,
                });
              }}
              placeholder={user.phno}
              required
            />

            <label htmlFor="address">Address : </label>
            <br />
            <textarea
              name="Address"
              value={edit ? data.Address : user.Address}
              onChange={(e) => {
                setData({
                  ...data,
                  Address: e.target.value,
                });
              }}
              placeholder={user.Address}
              required
            ></textarea>

            <br />

            {!edit ? (
              <button
                style={{
                  backgroundColor: "rgb(221, 32, 32)",
                  border: "1px solid",
                  color: "rgb(255, 255, 255)",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setEdit(true);
                }}
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                className="signup"
                onClick={(e) => {
                  setEdit(false);
                }}
              >
                Verify
              </button>
            )}
            <br />
            {edit ? (
              <button
                type="submit"
                className="signup"
                onClick={(e) => {
                  setEdit(false);
                }}
              >
                Cancel
              </button>
            ) : (
              ""
            )}
          </form>
          <br />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default User_details;
