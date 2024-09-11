/*eslint-disable*/
import React from "react";
import SuccessGif from "../assets/success.gif";
import "../style/Success.css";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  return (
    <div className="success">
      <div className="successimg">
        <img src={SuccessGif} alt="order success img" />
      </div>
      <h2>Ordered Successfully</h2>
      <p>Check order status on order details tab</p>
      <button className="btn" onClick={(e) => navigate("/")}>
        Home
      </button>
    </div>
  );
}

export default Success;
