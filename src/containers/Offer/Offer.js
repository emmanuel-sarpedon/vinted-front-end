import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import formatPrice from "../../helpers/formatPrice";

import Loader from "../../Components/Loader/Loader";

import "./Offer.scss";

const Offer = () => {
  const { id } = useParams();

  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="offer">
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
