/*eslint-disable*/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Productpg from "./pages/Productpg";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Productdetails from "./pages/Productdetails";
import Payment from "./pages/Payment";
import User_details from "./pages/User_details";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/productpg" exact Component={Productpg} />
        <Route path="/cart" exact Component={Cart} />
        <Route path="login" exact Component={Login} />
        <Route path="/reg" exact Component={Reg} />
        <Route path="/productdetails/:id" exact Component={Productdetails} />
        <Route path="/userdetails" exact Component={User_details} />
        <Route path="/payment" exact Component={Payment} />
        <Route path="/Success" exact Component={Success} />
      </Routes>
    </Router>
  );
}

export default App;
