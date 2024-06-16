/*eslint-disable*/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import { useStateValue } from "../components/StateProvider";
import "../style/Payment.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
import API_URL from "../../global/config";
import CurrencyFormat from "react-currency-format";
import { getTotal } from "../components/reducer";
import { Button, Col, Form } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar1 from "./Navbar1";
// import { env } from "react-dotenv";
// import axios from "../components/axios";

function Payment() {
  const stripePromise = loadStripe(
    /*  import.meta.env.VITE_STRIPE_SECREAT */
    "pk_test_51NuorqSJw0uOxBhDLfuHsnSCKjcKdcejK2hIqNG98f477uYwekMRExdxJwxg5Fal3gdFu0607Ewl1nNodKDgWNUH00A0hGuzk0"
    // "pk_live_51NuorqSJw0uOxBhDwYcumJKvWMX1txaFozhg4SmTkbXbZjIz6NF4fPa3FK4El8bmAA8OvEn2Ht8yAM0HQsg0KtSF00jcJk6Ydf"
  );
  const [{ basket, user }, dispatch] = useStateValue();
  const [pay_meth, setPaymeth] = useState("credit/debit");

  const navigate = useNavigate();

  var item = [];
  for (let i = 0; i < basket?.length; i++) {
    item.push(basket[i]?.name);
    item.push("qty:" + basket[i]?.qty);
  }

  console.log("item : ", item);

  const sendaxios = {
    name: user.name,
    age: user.age,
    email: user.email,
    phno: user.phno,
    Address: user.Address,
    basket_array: item, //array of name and quantity
    amount: getTotal(basket),
    payed: pay_meth != "credit/debit" ? "No" : "Yes",
    payment: pay_meth,
  };

  const handlepayment = async () => {
    try {
      const response = await axios.post(`${API_URL}basket`, sendaxios);
      console.log(response);

      if (response.data === "order not placed") {
        //error
        if (pay_meth != "credit/debit") {
          alert("Order not placed");
        }
      } else if (response.data === "Order placed") {
        //success
        alert("Order placed successfully");
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (user.name == "") {
    {
      alert("Login then go to payment section");
      navigate("/login");
    }
  } else {
    return (
      <>
        {/* <Navbar /> */}
        <Navbar1 />
        <div className="payment">
          <div className="payment_container">
            <h4>
              Cart (<Link to="/cart">{basket?.length} items</Link>)
            </h4>

            {/* delivery address*/}
            <div className="payment_section">
              <div className="payment_title">
                <h3>Delivery Address&nbsp;&nbsp;</h3>
              </div>
              <div className="payment_address">
                <p>{user?.email}</p>
                <p>{user?.Address}</p>
                <p>{user?.phno}</p>

                <button
                  className="editbtn"
                  onClick={(e) => navigate("/userdetails")}
                >
                  Edit Address
                </button>
              </div>
            </div>

            {/* review items */}
            <div className="payment_section">
              <div className="payment_title">
                <h3>Review item and delivery &nbsp;&nbsp;</h3>
              </div>

              <div className="payment_item">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Order Total ({basket?.length} items) :{" "}
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />

                {basket?.length == 0 ? (
                  <h4 style={{ textAlign: "center", color: "lightgray" }}>
                    No items
                  </h4>
                ) : (
                  basket.map((item, index) => (
                    <CartProduct
                      key={index}
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      qty={item.qty}
                    />
                  ))
                )}
              </div>
            </div>

            {/* payment method */}
            {basket?.length == 0 ? (
              ""
            ) : (
              <div className="payment_section">
                <div className="payment_title">
                  <h3>Payment method&nbsp;&nbsp;</h3>
                </div>
                <div className="payment_details">
                  <Col md={2}>
                    <Form.Control
                      style={{ borderColor: "skyblue" }}
                      as="select"
                      value={pay_meth}
                      /* style={{ marginTop: "-29px", marginLeft: "40px" }} */
                      onChange={(e) => {
                        setPaymeth(e.target.value);
                      }}
                    >
                      <option value="credit/debit" defaultChecked>
                        via credit/debit card
                      </option>
                      <option value="Cash on delivery">Cash on delivery</option>
                    </Form.Control>
                  </Col>

                  <br />
                  {/* {console.log("ClientSecret : ", clientSecret)} */}
                  {pay_meth == "credit/debit" && (
                    <Elements stripe={stripePromise}>
                      <CheckoutForm sendemail={handlepayment} />
                    </Elements>
                  )}

                  {pay_meth == "Cash on delivery" ? (
                    <div className="pay_btn">
                      <button className="btn" onClick={handlepayment}>
                        Order Now
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Payment;
