/* eslint-disable */
import React, { useState } from "react";
import { ProductList } from "../helpers/ProductList";
import ProductItem from "../components/ProductItem";
import "../style/Product.css";
import { useStateValue } from "../components/StateProvider";
import Toast1 from "../components/Toast";

function Product() {
  // const [{ user }, dispatch] = useStateValue();
  const [show, setShow] = useState(false);
  return (
    <div id="product">
      {/* {user.name} */}
      <Toast1 show={show} setShow={setShow} />
      <div className="productList">
        {ProductList.map((product, index) => {
          return (
            <ProductItem
              key={index}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              show={show}
              setShow={setShow}
              delivered={product.delivered}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Product;
