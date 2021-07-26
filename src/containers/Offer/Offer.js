import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import formatPrice from "../../helpers/formatPrice";

import Header from "../../Components/Header/Header";
import Loader from "../../Components/Loader/Loader";

import "./Offer.scss";

const Offer = () => {
  //const url = "https://lereacteur-vinted-api.herokuapp.com";
  const url = "https://api-vinted.herokuapp.com";
  const { id } = useParams();

  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchData(id) {
      setIsLoading(true);

      setToken(Cookies.get("token"));

      if (token) {
        const response = await axios.get(url + "/offer/" + id, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOffer(response.data);

        setIsLoading(false);
      }
    }
    fetchData(id);
  }, [id, token]);

  return (
    <div className="offer">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <img src={offer.product_image.secure_url} alt="offer" />
          <div className="offer-infos">
            <div className="price">{formatPrice(offer.product_price)}</div>
            <div className="details">
              {offer.product_details.map((e, i) => (
                <div>
                  <span>{`${Object.keys(e)}`}</span>
                  <span>{`${Object.values(e)}`}</span>
                </div>
              ))}
            </div>
            <div className="name">{offer.product_name}</div>
            <div className="description">{offer.product_description}</div>
            <div>{offer.owner.account.username}</div>
            <button>Acheter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
