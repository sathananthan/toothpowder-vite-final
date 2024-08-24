import React, { useState } from "react";
import { useStateValue } from "../components/StateProvider";
import "../style/PopupChgpass.css";
import axios from "axios";
import API_URL from "../../global/config";
import { useNavigate } from "react-router-dom";

function PopupChgAddress({ closePopup }) {
  const [{ user }, basket] = useStateValue();
  const [address, editAddress] = useState();

  const datapunch = {
    email: user.email,
    address: address,
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}ChgAddress`, datapunch);
      console.log(response);

      if (response.data.message === "All fields are required.") {
        alert("All fields are required. And User must login");
      } else if (response.data.message === "User not found.") {
        alert("User not found.");
      } else if (response.data.message === "Address changed successfully.") {
        alert("Address changed successfully.");
        navigate("/");
      } else {
        alert("An error occurred while changing the Address");
      }
    } catch (err) {
      console.log(err);
      if (err.message) {
        alert("Network error");
      }
    }
  };
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-box">
          <h2>Change Address</h2>
          <label htmlFor="address">Address : </label>
          {/*     <br /> */}
          <textarea
            name="Address"
            value={address}
            onChange={(e) => {
              editAddress(e.target.value);
            }}
            placeholder={user.Address}
            required
          ></textarea>
          <button onClick={closePopup} className="close">
            Close
          </button>
          <button onClick={handleSubmit} className="submit">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default PopupChgAddress;
