/* eslint-disable */
import React, { useEffect } from "react";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import "../style/Home.css";
import Product from "./Product";
import BannerImage from "../assets/family1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../global/config";
import { useStateValue } from "../components/StateProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Navbar1 from "./Navbar1";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Home() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserInfo"));

    if (user && user.token) {
      getdata(user.token);
    }
  }, []);

  const [{ user }, dispatch] = useStateValue();

  const getdata = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(`${API_URL}home/`, config);
      console.log("response from axois: ", response);

      if (response.data === "Invalid Token") {
        alert("login again");
      } else if (response.data === "Server Busy") {
        alert("Unautherized user");
      } else if (response?.status) {
        console.log("response data : ", response?.data);
        /* const data = {
          
        }; */

        // console.log("reqired Data : ", data);
        dispatch({
          type: "SET_USER",
          user: {
            name: response.data.name,
            email: response.data.email,
            age: response.data.age,
            Address: response.data.Address,
            phno: response.data.phno,
            password: response.data.password,
          },
        });

        console.log("User from reducer : ", user); //it show before updation see react article if any doubt
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Navbar1 />
      <div className="home">
        {/* <Navbar/> */}
        <div id="home1" style={{ backgroundImage: `url(${BannerImage})` }}>
          <div className="headerContainer">
            <h1>NCS's Tooth Powder Mfr.</h1>
            <p>
              Every tooth in a man's head is more valuable than a diamond{" "}
              {/* {user.name} */}
            </p>
            <Link to="/productpg">Product</Link>
          </div>
        </div>
        <Product />
        {/* <Footer/> */}
      </div>
      <Footer />
    </>
  );
}

export default Home;
