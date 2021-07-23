import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import Header from "../../Components/Header/Header";

import "./Home.scss";
import tear from "../../assets/tear.svg";

import formatPrice from "../../helpers/formatPrice";

const Home = () => {
  const [offers, setOffers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );

      setOffers(response.data.offers);

      setIsLoading(false);
    }
    fetchData();
  }, [offers.length]);

  return (
    <div className="home">
      <div className="ready">
        <Header />
        <div className="container">
          <div>
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button>Commencer à vendre</button>
          </div>
        </div>
        <img src={tear} alt="" />
      </div>
      <div className="offers">
        {isLoading
          ? "Chargement en cours"
          : offers.map((e, i) => (
              <Link key={e._id} to={"/offer/" + e._id}>
                <div className="offer-item">
                  <div className="username">{e.owner.account.username}</div>
                  <img src={e.product_image.secure_url} alt="" />
                  <div className="price">{formatPrice(e.product_price)}</div>
                  <div className="details">
                    {Object.values(e.product_details[0])}
                  </div>
                  <div className="details">
                    {Object.values(e.product_details[1])}
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Home;
