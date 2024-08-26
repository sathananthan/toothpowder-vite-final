import React, { useState } from "react";
// import "../style/PopupChgpass.css";
import axios from "axios";
import API_URL from "../../global/config";

function PopupForgetPass({ closePopup }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const [newRetypePassword, setRetypeNewPassword] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}password/send-otp`, {
        email,
      });
      console.log("response : ", response);

      const data = await response.data;
      if (data == false) {
        setMessage(
          "This email didn't have account on this page. 'Please create new account'"
        );
      } else if (data == "Server busy") {
        setMessage("Network Error check internet");
      } else {
        console.log("data : ", data);
        setOtpSent(true);
        setMessage(data);
      }
    } catch (error) {
      setMessage("Error sending OTP");
    }
  };

  const changePassword = async () => {
    try {
      if (newPassword == newRetypePassword) {
        const response = await axios.post(
          `${API_URL}password/change-password`,
          {
            email,
            otp,
            newPassword,
          }
        );
        const data = await response.data;
        console.log("response : ", response);
        setMessage(data);
      } else {
        setMessage("New password and Retype password not same");
      }
    } catch (error) {
      setMessage("Error changing password");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Reset Password</h2>
        {!otpSent && (
          <>
            <form onSubmit={sendOtp}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
                {...(otpSent && "disabled")}
              />
              {message == "" ? "" : !otpSent && <p>{message}</p>}
              <button /* onClick={sendOtp} */>Send OTP</button>
            </form>
          </>
        )}
        {otpSent && (
          <>
            {/* <br /> */}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {/*  <br />
            <br /> */}
            {otpSent && <p>{message}</p>}
            {/* <br /> */}
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="password"
              placeholder="Retype new password"
              value={newRetypePassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
              required
            />
            <br />
            <button onClick={changePassword} className="submit">
              Change Password
            </button>
          </>
        )}
        &nbsp;&nbsp;
        <button onClick={closePopup} className="close">
          Close
        </button>
      </div>
    </div>
  );
}

export default PopupForgetPass;
