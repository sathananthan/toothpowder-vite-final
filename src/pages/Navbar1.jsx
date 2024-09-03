/* eslint-disable */
import React from "react";
import { Badge, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useStateValue } from "../components/StateProvider";
import "../style/Navbar1.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export default function Navbar1() {
  const [{ basket, user }, dispatch] = useStateValue();

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
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg" /* for responsive */
        className="navbar-custom"
      >
        <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Nav.Link as={Link} to="/cart" className="cent ms-auto">
            <ShoppingCartIcon style={{ fontSize: "35px", marginTop: "7px" }} />
            <Badge bg="danger">{basket?.length}</Badge>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {" "}
              {/* ms for right me for left */}
              <Nav.Link as={Link} to="/" className="usericon">
                <HomeIcon />
                <br />
                <span className="user">Home</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/Productpg" className="usericon">
                <Inventory2Icon />
                <br />
                <span className="user">Products</span>
              </Nav.Link>
              {user?.name == "" ? (
                <Nav.Link as={Link} to="/login" className="cent">
                  <>
                    <span className="name">Hello {"Guest"} </span>
                    <br></br>
                    <span className="sign">{"Sign in"}</span>
                  </>
                </Nav.Link>
              ) : (
                <Nav.Link onClick={handleSignout} className="cent">
                  <>
                    <span className="name">Hello {user?.name} </span>
                    <br></br>
                    <span className="sign">{"Sign Out"}</span>
                  </>
                </Nav.Link>
              )}
              {!user?.name == "" ? (
                <Nav.Link as={Link} to="/userdetails" className="usericon">
                  {" "}
                  {/* /userdetails */}
                  <AccountCircleIcon />
                  <br />
                  <span className="user">{user?.name}</span>
                </Nav.Link>
              ) : (
                ""
              )}
              {/*  {basket?.length == 0 ? (
                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="cent"
                  onClick={(e) => {
                    if (basket?.length == 0) {
                      alert("Add any item in cart then click me");
                    }
                  }}
                >
                  <ShoppingCartIcon
                    style={{ fontSize: "35px", marginTop: "7px" }}
                  />
                  <Badge bg="danger">{basket?.length}</Badge>
                </Nav.Link>
              ) : ( */}
              <Nav.Link as={Link} to="/cart" className="basket-large-view">
                <ShoppingCartIcon
                  style={{ fontSize: "35px", marginTop: "7px" }}
                />
                <Badge bg="danger">{basket?.length}</Badge>
              </Nav.Link>
              {/* )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
