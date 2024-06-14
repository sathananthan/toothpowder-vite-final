/*eslint-disable*/
import React from "react";
import { useParams } from "react-router-dom";
import { ProductList } from "../helpers/ProductList";
import "../style/Productdetails.css";
import { useStateValue } from "../components/StateProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Navbar1 from "./Navbar1";

function Productdetails() {
  let { id } = useParams(); //must change
  const [{ basket }, dispatch] = useStateValue();

  const myprod = ProductList.find((prod) => prod.id == id);
  // const [myprod1, setProd] = useState(myprod);

  const addToCart = () => {
    //dispatch the item into the date layer

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: myprod.id,
        name: myprod.name,
        image: myprod.image,
        price: myprod.price,
        delivered: myprod.delivered,
      },
    });
    // console.log(basket);
  };

  const removeCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: myprod.id,
    });
  };

  console.log(myprod);
  return (
    <>
      {/* <Navbar /> */}
      <Navbar1 />
      <div className="productdetails">
        <div className="leftside">
          <img src={myprod.image} alt={myprod.name} className="prodimg" />
        </div>
        <div className="rightside">
          {/* Now showing post {myprod.id} */}
          <h2>{myprod.name}</h2>
          <p>${myprod.price}</p>
          {basket.some((bask) => bask.id === myprod.id) ? (
            <button onClick={removeCart}>Remove from Cart</button>
          ) : (
            <button onClick={addToCart} style={{ backgroundColor: "" }}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Productdetails;
