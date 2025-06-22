/*eslint-disable*/
import React, { useState } from "react";
import "../style/CartProduct.css";
import { useStateValue } from "../components/StateProvider";
import { Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function CartProduct({ id, image, name, price, qty }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  // console.log(basket);

  return (
    <div className="CartProduct">
      <div className="img">
        <Link to={"/productdetails/" + id}>
          <img
            src={image}
            alt="prod_img"
            height={"400px"}
            width={"300px"}
            className="prod_img"
          ></img>
        </Link>
        {/* &nbsp;&nbsp;<button onClick={addToCart}>+</button> &nbsp;{count}&nbsp;{" "} */}
        {/* <button>-</button> */}
      </div>

      <div className="info">
        <br />
        <p className="prod_tit">{name}</p>
        <small>₹</small>
        <strong className="price">{price * qty}</strong>
        <br />
        <br />

        {/*  <input
          type="number"
          value={qty}
          onChange={(e) => {
            dispatch({
              type: "CHGE_BASK_QTY",
              item: {
                id: id,
                qty: e.target.value,
              },
            });
          }}
        /> */}

        {/* <select
          id="qty"
          value={qty}
          onChange={(e) => {
            dispatch({
              type: "CHGE_BASK_QTY",
              item: {                                     //only using dispatch only we change value in reducer
                id: id,
                qty: e.target.value,
              },
            });
          }}
        >
          <option key="1">1</option>
          <option key="2">2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select> */}
        <Col md={5} className="d-flex align-items-center">
          <label htmlFor="qty">qty&nbsp;:&nbsp;</label>

          <Form.Control
            as="select"
            value={qty}
            className="qty-select"
            onChange={(e) => {
              dispatch({
                type: "CHGE_BASK_QTY",
                item: {
                  id: id,
                  qty: e.target.value,
                },
              });
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Col>
        <br></br>
        <button onClick={removeFromCart}>Remove from Cart</button>
      </div>
    </div>
  );
}

export default CartProduct;
