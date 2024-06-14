/*eslint-disable*/
import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import "../style/CheckoutForm.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import API_URL from "../../global/config";

export default function CheckoutForm({ sendemail }) {
  //after success only mail have to send fix it
  const stripe = useStripe();
  const elements = useElements();

  const [{ basket, user }, dispatch] = useStateValue();
  const [Loading, isLoading] = useState(false);
  const [message, setMesaage] = useState("");
  var clientSecret;

  const handleSubmitPay = async (event) => {
    event.preventDefault();

    isLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const res = await axios.post(`${API_URL}create-payment-intent`, {
      items: basket,
      email: user.email,
    });

    clientSecret = res.data.clientSecret1;
    console.log("clientsecret : ", clientSecret);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.name,
          email: user.email,
          /*  address: user.Address, */
          phone: user.phno,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error);
      isLoading(false);
      setMesaage(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Kasu vant");
        setMesaage(result.paymentIntent.status);
        isLoading(false);
        sendemail();
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmitPay}>
      <CardElement id="payment-element" options={{ hidePostalCode: true }} />
      <br />
      <button
        className="onlinePayBtn"
        disabled={Loading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {Loading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages  */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
