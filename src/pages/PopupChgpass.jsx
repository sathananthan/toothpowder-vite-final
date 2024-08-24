import React, { useState } from 'react'
import '../style/PopupChgpass.css'
import { useStateValue } from '../components/StateProvider';
import axios from "axios";
import API_URL from '../../global/config';
import { useNavigate } from 'react-router-dom';

function PopupChgpass({ closePopup }) {
    const [data, setData] = useState({
        currentps: "",
        newps: "",
        reps: "",
      });

    const [{ user }, basket] = useStateValue();
    const navigate = useNavigate();

    const datapunch = {
        email:user.email,
        currentPassword:data.currentps,
        newPassword:data.newps
      };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if(data.newps == data.reps){
            const response = await axios.post(`${API_URL}ChgPass`, datapunch);
            console.log(response);
    
            if (response.data.message === "All fields are required.") {
            alert("All fields are required. And User must login");
            } else if (response.data.message === "User not found.") {
            alert("User not found.");
            }else if (response.data.message === "Current password is incorrect.") {
                alert("Current password is incorrect.");
            }else if (response.data.message === "New password must be different from the current password.") {
                alert("New password must be different from the current password.");
                }else if (response.data.message === "Password changed successfully.") {
                    alert("Password changed successfully.");
                    navigate("/");
                    }else if (response.data.message === "An error occurred while changing the password.") {
                        alert("An error occurred while changing the password.");
                        }
        }else{
            alert("Retype password not match with ''new password''")
        }
        
    } catch (err) {
        console.log(err);
        if (err.message) {
        alert("Network error");
        }
    }
}
  return (
    <> 
    <div className="popup-overlay">
    <div className="popup-box">
      <h2>Change Password</h2>
      <form>
        <label>Current Password : &nbsp;</label>
        <input type='password' onChange={(e) => {
                setData({
                  ...data,
                  currentps: e.target.value,
                });
              }} required></input><br /><br />

<label>New Password &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;</label>
        <input type='password' onChange={(e) => {
                setData({
                  ...data,
                  newps: e.target.value,
                });
              }} required></input><br /><br />

          <label>Retype Password : &nbsp;</label>
        <input type='password' onChange={(e) => {
                setData({
                  ...data,
                  reps: e.target.value,
                });
              }} required></input>
              <br />
              <button onClick={closePopup} className='close'>Close</button>
              <button onClick={handleSubmit} className='submit'>Submit</button>
      </form>
      
    </div>
  </div>
  </>
  )
}

export default PopupChgpass