/*eslint-disable*/
import React from "react";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import "../style/Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getTotal } from "./reducer";

function Subtotal() {
  const [{ basket, user }] = useStateValue();
  const Navigate = useNavigate();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items) : <strong>{value}</strong>
            </p>
            {/* <small className="gift">
              <input type="checkbox" />
              This order contains a gift
            </small> */}
          </>
        )}
        decimalScale={2}
        value={getTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button
        onClick={(e) => {
          if (user.name == "") {
            alert("Login then go to payment section");
            Navigate("/login");
          } else if (basket?.length == 0) {
            alert("Add any item in cart then go to payment section");
            Navigate("/productpg");
          } else {
            Navigate("/payment");
          }
        }}
      >
        Proceed
      </button>
    </div>
  );
}

export default Subtotal;
