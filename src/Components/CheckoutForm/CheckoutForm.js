import "./CheckoutForm.scss";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ token }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement);

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "http://localhost:5000/payment",
      {
        stripeToken,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div className="checkout-form">
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <div>
            <span>Résumé de la commande</span>
            <div>
              <span>Commande</span>
              <span>3,95€</span>
            </div>
            <div>
              <span>Frais de transactions</span>
              <span>0,95€</span>
            </div>
            <div>
              <span>Frais de livraison</span>
              <span>1,30€</span>
            </div>
          </div>
          <div>
            <div>
              <span>Total</span>
              <span>6,20€</span>
            </div>
          </div>
          <CardElement className="card-element" />
          <button type="submit">Pay</button>
        </form>
      ) : (
        "Merci pour l'achat"
      )}
    </div>
  );
};

export default CheckoutForm;
