import "./App.scss";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Signup from "./containers/Signup/Signup";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Publish from "./containers/Publish/Publish";
import Payment from "./containers/Payment/Payment";

import Cookies from "js-cookie";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounce(search, 500);
  const [isPriceDesc, setIsPriceDesc] = useState(false);

  const [priceMin, setPriceMin] = useState(0);
  const [debouncePriceMin] = useDebounce(priceMin, 500);
  const [priceMax, setPriceMax] = useState(1000);
  const [debouncePriceMax] = useDebounce(priceMax, 500);

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangePriceSorting = (e) => {
    setIsPriceDesc(e.target.checked);
  };

  const handleChangePriceRange = (array) => {
    setPriceMin(Math.min(...array));
    setPriceMax(Math.max(...array));
  };

  return (
    <div className="app">
      <Router>
        <Header
          token={token}
          handleLogout={handleLogout}
          search={search}
          handleChangeSearch={handleChangeSearch}
          isPriceDesc={isPriceDesc}
          handleChangePriceSorting={handleChangePriceSorting}
          priceRange={[priceMin, priceMax]}
          handleChangePriceRange={handleChangePriceRange}
        />
        <Switch>
          <Route exact path="/">
            <Home
              search={debounceSearch}
              isPriceDesc={isPriceDesc}
              priceMin={debouncePriceMin}
              priceMax={debouncePriceMax}
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
          <Route path="/publish">
            <Publish token={token} />
          </Route>
          <Route path="/payment">
            <Payment token={token} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
