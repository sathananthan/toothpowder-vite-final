/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../style/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div className="left">
          <Link to="/">
            <p>Logo</p>
          </Link>
        </div>
        <div className="right">
          <div className="Links">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link> <br></br>
            <br></br>
            <Link to="/productpg">Product</Link> <br></br>
            <br></br>
          </div>
          <div id="contact">
            <h3>Contacts</h3>
            <p>
              <LocationOnIcon />
              &nbsp; 67, Main Road, 2th Kilometer,<br></br>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chengalpattu - 667577,
              Tamilnadu,<br></br>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;India.
            </p>
            <p>
              <CallIcon /> &nbsp;Customer Care : 91-7364229949
            </p>
            <p>
              <EmailIcon /> &nbsp;sales@aatsuddhasiddha.com
            </p>
          </div>
        </div>
        <div className="down">
          <a href="#link" className="Insta">
            <InstagramIcon />
          </a>{" "}
          <a href="#link">
            <TwitterIcon />
          </a>{" "}
          <a href="#link">
            <FacebookIcon />
          </a>{" "}
          <a href="#link">
            <LinkedInIcon />
          </a>
        </div>
      </div>
      <div className="buttom">
        <p>
          &copy; Copyright 2024 Arutperumjothi Suddha Siddha Private Limited.
        </p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
