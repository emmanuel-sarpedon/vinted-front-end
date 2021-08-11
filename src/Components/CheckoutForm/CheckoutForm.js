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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement);
      const stripeToken = stripeResponse.token.id;

      setIsButtonDisabled(true);
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
        setIsButtonDisabled(false);
      }
    } catch (error) {}
  };

  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit}>
        {!completed && (
          <>
            <div>
              <div>
                <span>Résumé de la commande</span>
                <span>{description}</span>
              </div>
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
          </>
        )}

        <button type="submit" disabled={isButtonDisabled}>
          {!completed ? "Pay" : "Merci pour l'achat"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
