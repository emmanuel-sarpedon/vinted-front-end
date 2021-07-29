import { Link } from "react-router-dom";

import vintedlogo from "../../assets/vinted_logo.png";
import DoubleRangeSlider from "../DoubleRange/DoubleRangeSlider";

import "./Header.scss";

const Header = (props) => {
  const {
    token,
    handleLogout,
    keyword,
    handleChangeKeyword,
    isPriceSorting,
    handleChangePriceSorting,
    priceRange,
    handleChangePriceRange,
  } = props;

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={vintedlogo} alt="vinted-logo" />
        </Link>
        <form>
          <input
            type="checkbox"
            checked={isPriceSorting}
            onChange={handleChangePriceSorting}
          />
          <input type="text" value={keyword} onChange={handleChangeKeyword} />
          <DoubleRangeSlider
            priceRange={priceRange}
            onChange={handleChangePriceRange}
          />
        </form>
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
