/*eslint-disable*/
import React, { useState } from "react";
import "../style/Cart.css";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import Subtotal from "../components/Subtotal";
import { useStateValue } from "../components/StateProvider";
import CartProduct from "../components/CartProduct";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Navbar1 from "./Navbar1";

function Cart() {
  const [{ basket }, dispatch] = useStateValue();
  // var itemCart = [];
  // var [count, setCount] = useState(1);             //do something
  //   const show = 'Hello '+ user?.email;
  return (
    <>
      {/* <Navbar /> */}
      <Navbar1 />
      <div className="cart">
        {/* <Navbar/> */}
        <div className="cart1">
          <div className="left">
            {/* <h4>{user ? show : ''}</h4> */}
            <h2 className="cart_title">Your Cart</h2>
            {basket?.length == 0 ? (
              <h4 style={{ textAlign: "center", color: "lightgray" }}>
                No items
              </h4>
            ) : (
              basket.map((item, index) => {
                // console.log("basket >>", basket);

                /*   for(var i=0; i<=basket.length; i++){
                  if(basket[i] == item)
                    return null;
                  else if(basket[i] !== item){
                    return (
                      <CartProduct
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        count={count}
                      />
                      )
                    }
                } */
                return (
                  <CartProduct
                    key={index}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    qty={item.qty}
                  />
                );
              })
            )}{" "}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>

          <div className="right_total">
            <Subtotal />
          </div>
        </div>
        {/* <Footer/> */}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
