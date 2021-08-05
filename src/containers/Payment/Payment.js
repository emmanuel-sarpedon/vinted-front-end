import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router";

import "./Payment.scss";

import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JKcCGLRomK6JYNOAH8jKXiYqwd3ZmdIIVtFvTSUUfm04e9IpsZTdjomlB3ZNTgDt1SfLR8umxm0M6mz9iiJwzp600X38ai1tt"
);

const Payment = (props) => {
  const { token } = props;

  const history = useHistory();

  return (
    <div className="payment">
      {token ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm token={token} />
        </Elements>
      ) : (
        history.push("/login")
      )}
    </div>
  );
};

export default Payment;
