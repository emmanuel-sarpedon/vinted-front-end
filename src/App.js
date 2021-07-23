import "./App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./containers/Signup/Signup";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
