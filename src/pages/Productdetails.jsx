/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductList } from "../helpers/ProductList";
import "../style/Productdetails.css";
import { useStateValue } from "../components/StateProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Navbar1 from "./Navbar1";
import API_URL from "../../global/config";
import ReactStars from "react-rating-stars-component";
import Toast1 from "../components/Toast";

function Productdetails() {
  let { id } = useParams(); //must change
  const [{ basket, user }, dispatch] = useStateValue();
  const [show, setShow] = useState(false);

  const myprod = ProductList.find((prod) => prod.id == id);
  // const [myprod1, setProd] = useState(myprod);

  const addToCart = () => {
    //dispatch the item into the date layer
    setShow(true); //to show toast
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

  const [product, setProduct] = useState(null);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  var newComment = {
    idindex: myprod.id,
    name: myprod.name,
    description: "",
    price: myprod.price,
    username: username,
    rating: rating,
    comment: comment,
  };

  // const [Overallrating, setOverallrating] = useState(0);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(
          `${API_URL}productcmt/products/${myprod.id}`,
          newComment
        );
        console.log("response : ", response);

        setProduct(response.data); // Assuming you want to set the response data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [myprod.id]);

  const calculateOverallRating = (comments) => {
    if (comments && comments.length > 0) {
      const totalRating = comments.reduce((sum, c) => sum + c.rating, 0);
      return totalRating / comments.length;
    }
    return 0; // Default value if no comments exist
  };

  const overallRating = calculateOverallRating(product?.comments);

  console.log(myprod);
  console.log("Product : ", product);
  console.log("newcomment : ", newComment);

  const submitComment = async (e) => {
    e.preventDefault();

    if (user.name != "" && user.name) {
      newComment.username = user.name;
      console.log("username must : ", newComment);

      try {
        const response = await axios.post(
          `${API_URL}productcmt/products/${myprod.id}`,
          newComment
        );
        setProduct(response.data);
        setUsername("");
        setRating(5);
        setComment("");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("login to comment");
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Navbar1 />
      <div className="productdetails">
        <div className="leftside">
          <img src={myprod.image} alt={myprod.name} className="prodimg" />
        </div>
        <div className="rightside">
          <Toast1 show={show} setShow={setShow} />
          {/* Now showing post {myprod.id} */}
          <h2>{myprod.name}</h2>
          <p>${myprod.price}</p>
          {/* <p>Discription</p> */}
          {basket.some((bask) => bask.id === myprod.id) ? (
            <button onClick={removeCart} className="remove-button">
              Remove from Cart
            </button>
          ) : (
            <button onClick={addToCart} className="comment-button">
              Add to Cart
            </button>
          )}
          <br />
          <h4>Overall Rating </h4>
          <ReactStars
            count={5}
            value={overallRating}
            size={28}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            edit={false}
          />
          {/* {overallRating} */}
        </div>
      </div>
      {!product ? (
        <div></div>
      ) : (
        <>
          <div className="comment-container">
            <div className="comment-header">
              <h3>Comments</h3>

              {product.comments.map((c, index) => (
                <div key={index}>
                  <>
                    <strong>
                      <span className="username">{c.username}</span>
                    </strong>

                    <>
                      <div className="rating-container">
                        <span>rating :</span>
                        <span className="rating-stars">
                          <ReactStars
                            count={5}
                            value={c.rating}
                            onChange={ratingChanged}
                            size={28}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                            edit={false}
                          />
                        </span>
                        <span className="rating-value">/5</span>
                      </div>
                    </>
                  </>
                  {/* <div class="comment-title">
                    <h4>Amazing Product</h4>
                  </div> */}
                  <div className="container-cmt">
                    <p className="paragraph-para">
                      <p>{c.comment}</p>
                    </p>
                  </div>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {user?.name ? (
        <div className="comment-container">
          <div className="comment-header">
            <h4>Add a Comment</h4>
            <form
              method="post"
              onSubmit={submitComment}
              className="comment-form"
            >
              {/* <input
              type="hidden"
              placeholder="Username"
              value={user.name}
              required
            /> */}
              <div className="rating-container">
                <span className="rating-stars">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={28}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    value={rating}
                    required
                  />
                </span>
              </div>
              <textarea
                placeholder="Type new comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-box"
                required
              />
              <button type="submit" className="comment-button">
                Comment
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="comment-container">
          <div className="comment-header">
            <h5>Login to comment</h5>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Productdetails;
