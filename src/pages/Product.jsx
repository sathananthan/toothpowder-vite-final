/* eslint-disable */
import React from "react";
import { ProductList } from "../helpers/ProductList";
import ProductItem from "../components/ProductItem";
import "../style/Product.css";
import { useStateValue } from "../components/StateProvider";

function Product() {
  // const [{ user }, dispatch] = useStateValue();
  return (
    <div id="product">
      {/* {user.name} */}
      <div className="productList">
        {ProductList.map((product, index) => {
          return (
            <ProductItem
              key={index}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              delivered={product.delivered}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Product;
