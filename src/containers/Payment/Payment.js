import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./Payment.scss";
import Loader from "../../Components/Loader/Loader";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JKcCGLRomK6JYNOAH8jKXiYqwd3ZmdIIVtFvTSUUfm04e9IpsZTdjomlB3ZNTgDt1SfLR8umxm0M6mz9iiJwzp600X38ai1tt"
);

const Payment = (props) => {
  const { token } = props;
  const { id } = useParams();
  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderExpenses, setOrderExpenses] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryExpenses = 2.5;

  const history = useHistory();

  useEffect(() => {
    async function fetchData(id) {
      const url = "https://api-vinted.herokuapp.com";
      setIsLoading(true);

      const response = await axios.get(url + "/offer/" + id);

      setOffer(response.data);

      setIsLoading(false);
    }
    fetchData(id);
  }, [id]);

  useEffect(() => {
    setOrderExpenses((offer.product_price * 6) / 100);
  }, [offer]);

  useEffect(() => {
    setTotalPrice(offer.product_price + orderExpenses + deliveryExpenses);
  }, [offer, orderExpenses]);

  return (
    <div className="payment">
      {token ? (
        <Elements stripe={stripePromise}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <CheckoutForm
                token={token}
                price={offer.product_price}
                orderExpenses={orderExpenses}
                deliveryExpenses={deliveryExpenses}
                totalPrice={totalPrice}
                description={offer.product_description}
              />
            </>
          )}
        </Elements>
      ) : (
        history.push("/login")
      )}
    </div>
  );
};

export default Payment;
