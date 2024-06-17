/* eslint-disable */
import React from "react";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import "../style/Productpg.css";
import Product from "./Product";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Navbar1 from "./Navbar1";

function Productpg() {
  return (
    <>
      {/* <Navbar /> */}
      <Navbar1 />
      <div className="Productpg">
        {/* <Navbar/> */}
        <br />
        <h1 className="productTitle">
          Our <span className="prodred">Products</span>
        </h1>

        <Product />
        {/* <Footer/> */}
      </div>
      <Footer />
    </>
  );
}

export default Productpg;
