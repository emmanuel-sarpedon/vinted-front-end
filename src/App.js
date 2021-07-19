import "./App.scss";

import axios from "axios";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./containers/Home";
import Offer from "./containers/Offer";

const App = () => {
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
    <div className="app">
      <Router>
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/">
            <Home isLoading={isLoading} offers={offers} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
