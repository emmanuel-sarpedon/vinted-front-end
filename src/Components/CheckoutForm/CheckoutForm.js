import "./CheckoutForm.scss";
import formatPrice from "../../helpers/formatPrice";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = (props) => {
  const {
    token,
    price,
    orderExpenses,
    deliveryExpenses,
    totalPrice,
    description,
  } = props;
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
        totalPrice,
        description,
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
            <span>{description}</span>
            <div>
              <span>Commande</span>
              <span>{formatPrice(price)}</span>
            </div>
            <div>
              <span>Frais de transactions</span>
              <span>{formatPrice(orderExpenses)}</span>
            </div>
            <div>
              <span>Frais de livraison</span>
              <span>{formatPrice(deliveryExpenses)}</span>
            </div>
          </div>
          <div>
            <div>
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
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
