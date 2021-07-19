import { useState, useEffect } from "react";

import axios from "axios";

import Header from "../Components/Header/Header";

import "./Home.scss";

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );

      console.log(response);

      setOffers(response.data);

      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="ready">
        <div>
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <div className="offers">
        {isLoading
          ? "Chargement en cours"
          : offers.offers.map((e, i) => (
              <div className="offer-item">
                <div key={e._id}>{e.owner.account.username}</div>
                <img src={e.product_image.secure_url} alt="" />
                <div>
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(e.product_price)}
                </div>
                <div>{e.product_details[0].MARQUE}</div>
                <div>{e.product_details[1].TAILLE}</div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
