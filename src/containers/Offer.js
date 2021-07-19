import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import formatPrice from "../helpers/formatPrice";

import Header from "../Components/Header/Header";

import "./Offer.scss";

const Offer = () => {
  const { id } = useParams();

  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(id) {
      setIsLoading(true);

      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
      );

      setOffer(response.data);

      setIsLoading(false);
    }
    fetchData(id);
  }, [id]);

  return (
    <div className="offer">
      <Header />
      {isLoading ? (
        "Chargement en cours"
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
