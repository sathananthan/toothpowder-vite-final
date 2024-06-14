/* eslint-disable */
import React, { useState } from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../components/StateProvider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [{ basket, user }, dispatch] = useStateValue();
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const handleSignout = (e) => {
    e.preventDefault();
    //
    // console.log("clicked me");
    localStorage.clear();

    dispatch({
      //user data get clear from state
      type: "SET_USER", //why its get reload
      user: {
        name: "",
        email: "",
        age: "",
        Address: "",
        phno: "",
        password: "",
      },
    });
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/">
          <p>Logo</p>
        </Link>
        <div className="hiddenLinks">
          <Link to="/" className="hm">
            Home
          </Link>
          <Link to="/Productpg" className="pd">
            Product
          </Link>

          <Link
            to={user?.name == "" && "/login"}
            onClick={!user?.name == "" && handleSignout}
            className="user"
          >
            <span>Hello {user?.name == "" ? "Guest" : user?.name} </span>
            <br></br>
            <span className="sign">{user?.name ? "Sign Out" : "Sign in"}</span>
          </Link>

          {!user?.name == "" ? (
            <Link to="/userdetails" className="user">
              <AccountCircleIcon />
              <br />
              <span>{user?.name}</span>
            </Link>
          ) : (
            ""
          )}

          <Link
            to={!basket?.length == 0 && "/cart"}
            onClick={(e) => {
              if (basket?.length == 0) {
                alert("Add any item in cart then click me");
              }
            }}
          >
            <ShoppingCartIcon />
          </Link>

          <span className="cartCount">{basket?.length}</span>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/" className="hm">
          Home
        </Link>
        <Link to="/Productpg" className="pd">
          Product
        </Link>
        <Link
          to={user?.name == "" && "/login"}
          onClick={!user?.name == "" && handleSignout}
          className="user"
        >
          <span>Hello {user?.name == "" ? "Guest" : user?.name}</span>
          <br></br>
          <span className="sign">{user?.name ? "Sign Out" : "Sign in"}</span>
        </Link>

        {!user?.name == "" ? (
          <Link to="/userdetails" className="user">
            <AccountCircleIcon />
            <br />
            <span>{user?.name}</span>
          </Link>
        ) : (
          ""
        )}

        <Link
          to={!basket?.length == 0 && "/cart"}
          onClick={(e) => {
            if (basket?.length == 0) {
              alert("Add any item in cart then click me");
            }
          }}
        >
          <ShoppingCartIcon />
        </Link>

        <span className="cartCount">{basket?.length}</span>

        <button onClick={toggleNavbar} id={openLinks ? "close" : "open"}>
          <ReorderIcon />
        </button>
        <button
          onClick={toggleNavbar}
          id={openLinks ? "open" : "close"}
          className="rot"
        >
          <CancelIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
