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

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
  };

  return (
    <div className="app">
      <Router>
        <Header token={token} handleLogout={handleLogout} />
        <Switch>
          <Route exact path="/">
            <Home />
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
