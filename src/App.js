import "./App.scss";

import axios from "axios";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import "./Components/Header/Header.scss";
import Header from "./Components/Header/Header";
import Home from "./containers/Home";
//import Offer from "./containers/Offer";

import "./containers/Home.scss";

import formatPrice from "./helpers/formatPrice";

const App = () => {
  const [offers, setOffers] = useState([]);
  const [numberOfOffers, setNumberOfOffers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );

      setOffers(response.data.offers);

      setNumberOfOffers(offers.length);

      setIsLoading(false);
    }
    fetchData();
  }, [offers.length]);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/offer/:id">
            <Offer isLoading={isLoading} offer={offers[0]} />
          </Route>
          <Route path="/">
            <Home isLoading={isLoading} offers={offers} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

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
        <div>
          <img src={offer.product_image.secure_url} alt="offer" />

          <div>{formatPrice(offer.product_price)}</div>
          <ul>
            {offer.product_details.map((e, i) => (
              <li>{`${Object.keys(e)} : ${Object.values(e)}`}</li>
            ))}
          </ul>
          <div>{offer.product_name}</div>
          <div>{offer.product_description}</div>
          <div>{offer.owner.account.username}</div>
        </div>
      )}
    </div>
  );
};
export default App;
