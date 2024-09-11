import React from "react";
import Navbar1 from "./Navbar1";
import Footer from "./Footer";
import { useStateValue } from "../components/StateProvider";
import { useNavigate } from "react-router-dom";
import "../style/OrderDetails.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function OrderDetails() {
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(user);

  if (user.name == "") {
    return (
      <>
        <Navbar1 />
        <br />
        <br />
        <div className="basket-container Productpg">
          <h1 className="productTitle">
            Login to see <span className="prodred">your order details</span>
          </h1>
        </div>
        <br />
        <br />

        <Footer />
      </>
    );
  } else if (user?.basket.length == 0) {
    return (
      <>
        <Navbar1 />
        <br />
        <br />
        <div className="basket-container Productpg">
          <h1 className="productTitle">
            No product for <span className="prodred">delivery</span>
          </h1>
        </div>
        <br />
        <br />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar1 />
        <div className="basket-container Productpg">
          <h1 className="productTitle">
            Order <span className="prodred">Details</span>
          </h1>
          <ul>
            {user?.basket.map((bask, index) => (
              <div key={index} className="basket">
                <strong>Basket {index + 1}:</strong>
                <ul className="basket-items">
                  {bask.map((bas, i) => {
                    let isLastItem = i === bask.length - 1; // The last item (gives true or false)
                    const isSecondLastItem = i === bask.length - 2; // The second last item

                    return (
                      <li key={i}>
                        {/* Add custom text for the last two items */}
                        {isSecondLastItem && <b>Ordered Date - </b>}
                        {isLastItem && <b> Delivered Status - </b>}
                        <span>
                          {bas.charAt(0).toUpperCase() + bas.slice(1)}{" "}
                          {/* first letter caps */}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </ul>
        </div>

        <Footer />
      </>
    );
  }
}

export default OrderDetails;
