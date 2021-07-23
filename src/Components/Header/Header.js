import Cookies from "js-cookie";

import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import vintedlogo from "../../assets/vinted_logo.png";

import "./Header.scss";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState("");

  let history = useHistory();

  useEffect(() => {
    setToken(Cookies.get("token"));
    token ? setIsConnected(true) : setIsConnected(false);
  }, [token]);

  const handleClickDisconnect = () => {
    Cookies.remove("token");
    setToken(Cookies.get("token"));
    history.push("/");
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={vintedlogo} alt="vinted-logo" />
        </Link>
        <div>
          {isConnected ? (
            <>
              <button className="falsy" onClick={handleClickDisconnect}>
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <button className="thin">
                <Link to="/signup">S'inscrire</Link>
              </button>
              <button className="thin">
                <Link to="/login">Se connecter</Link>
              </button>
            </>
          )}

          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
