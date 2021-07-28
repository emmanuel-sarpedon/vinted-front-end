import { Link } from "react-router-dom";

import vintedlogo from "../../assets/vinted_logo.png";

import "./Header.scss";

const Header = (props) => {
  const { token, handleLogout } = props;

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={vintedlogo} alt="vinted-logo" />
        </Link>
        <div>
          {token ? (
            <>
              <button className="falsy" onClick={handleLogout}>
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
