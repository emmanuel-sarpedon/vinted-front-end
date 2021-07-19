import "./App.scss";

import axios from "axios";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./Components/Header/Header";
//import Home from "./containers/Home";
//import Offer from "./containers/Offer";

import "./containers/Home.scss";

import formatPrice from "./helpers/formatPrice";

function App() {
  const [offers, setOffers] = useState([]);
  const [numberOfOffers, setNumberOfOffers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );

      console.log(response);

      setOffers(response.data.offers);
      setNumberOfOffers(offers.length);

      setIsLoading(false);
    }
    fetchData();
  }, [offers.length]);

  return (
    <div className="app">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/offer">Offer</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/offer">
            <Offer isLoading={isLoading} offer={offers[0]} />
          </Route>
          <Route path="/">
            <Home isLoading={isLoading} offers={offers} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const Home = (props) => {
  const { isLoading, offers } = props;

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
          : offers.map((e, i) => (
              <div key={i} className="offer-item">
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

const Offer = ({ offer, isLoading }) => {
  return (
    <div className="offer">
      {isLoading ? (
        "Chargement en cours"
      ) : (
        <div>
          <img src={offer.product_image.secure_url} alt="offer" />
          <div>{offer.product_name}</div>
          <div>{formatPrice(offer.product_price)}</div>
        </div>
      )}
    </div>
  );
};
export default App;
