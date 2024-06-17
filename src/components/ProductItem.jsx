/* eslint-disable */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Toast1 from "./Toast";

function ProductItem({ id, image, name, price, delivered, show, setShow }) {
  const [{ basket }, dispatch] = useStateValue();

  // const [cart, iscart] = useState(false);
  // const carted = cart? true : null;     do something

  const Navigate = useNavigate();
  // const [{basket}, dispatch] = useReducer(reducer, initialstate)
  // console.log("this is the basket >> ",basket);

  const addToCart = () => {
    //dispatch the item into the date layer
    setShow(true); //to show toast
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        name: name,
        image: image,
        price: price,
        delivered: delivered,
      },
    });
    // console.log(basket);
  };

  const removeCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <>
      <div className="productItem">
        <Link to={"/productdetails/" + id}>
          <div style={{ backgroundImage: `url(${image})` }}></div>
          <h1 className="productItemTitle">{name}</h1>
          <p className="productItemPrice">₹{price}</p>
        </Link>
        {/* {cart ? (
        <button onClick={(e) => Navigate("/cart")}>Go to Cart</button>
      ) : (
        <button
          onClick={() => {
            addToCart();
            iscart(true);
          }}
        >
          Add to Cart
        </button>
      )} */}
        {basket.some((bask) => bask.id === id) ? (
          <button onClick={removeCart} className="productItemRmbtn">
            Remove
          </button>
        ) : (
          <button onClick={addToCart} className="productItemAddbtn">
            Add to Cart
          </button>
        )}
      </div>
    </>
  );
}

export default ProductItem;
