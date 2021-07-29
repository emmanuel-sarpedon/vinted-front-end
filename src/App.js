import "./App.scss";

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Signup from "./containers/Signup/Signup";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";

import Cookies from "js-cookie";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [keyword, setKeyword] = useState("");
  const [isPriceDesc, setIsPriceDesc] = useState(false);

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
  };

  const handleChangeKeyword = (e) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const handleChangePriceSorting = (e) => {
    setIsPriceDesc(!isPriceDesc);
  };

  const handleChangePriceRange = (event, array) => {
    setPriceMin(Math.min(...array));
    setPriceMax(Math.max(...array));
  };

  return (
    <div className="app">
      <Router>
        <Header
          token={token}
          handleLogout={handleLogout}
          title={keyword}
          handleChangeKeyword={handleChangeKeyword}
          isPriceDesc={isPriceDesc}
          handleChangePriceSorting={handleChangePriceSorting}
          priceRange={[priceMin, priceMax]}
          handleChangePriceRange={handleChangePriceRange}
        />
        <Switch>
          <Route exact path="/">
            <Home
              keyword={keyword}
              isPriceDesc={isPriceDesc}
              priceMin={priceMin}
              priceMax={priceMax}
            />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/signup">
            <Signup handleLogin={handleLogin} />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
