import { Link } from "react-router-dom";

import vintedlogo from "../../assets/vinted_logo.png";
import DoubleRangeSlider from "../DoubleRange/DoubleRangeSlider";

import "./Header.scss";

const Header = (props) => {
  const {
    token,
    handleLogout,
    search,
    handleChangeSearch,
    isPriceDesc,
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
        <div className="filters">
          <form>
            <input
              type="text"
              value={search}
              onChange={handleChangeSearch}
              placeholder="Rechercher des articles"
            />

            <label className="switch">
              Tri par prix :
              <input
                type="checkbox"
                checked={isPriceDesc}
                onChange={handleChangePriceSorting}
              />
              <div className="slider">
                <span className={isPriceDesc && "checked"}>↑</span>
              </div>
            </label>

            <DoubleRangeSlider
              priceRange={priceRange}
              onChange={handleChangePriceRange}
              min={0}
              max={1000}
            />
          </form>
        </div>

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
