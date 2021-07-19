import { Link } from "react-router-dom";

import vintedlogo from "../../assets/vinted_logo.png";

import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={vintedlogo} alt="vinted-logo" />
        </Link>
        <div>
          <button className="thin">S'inscrire</button>
          <button className="thin">Se connecter</button>
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
