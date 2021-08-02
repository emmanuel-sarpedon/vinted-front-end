import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import vintedlogo from "../../assets/vinted_logo.png";
import DoubleRange from "../DoubleRange/DoubleRange";

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

  const [isFiltersHidden, setIsFiltersHidden] = useState(false);

  const location = useLocation();

  useEffect(() => {
    location.pathname === "/"
      ? setIsFiltersHidden(false)
      : setIsFiltersHidden(true);
  }, [location.pathname]);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={vintedlogo} alt="vinted-logo" />
        </Link>
        <div className={`filters ${isFiltersHidden ? "hidden" : ""}`}>
          <form>
            <div className="search">
              <input
                type="text"
                value={search}
                onChange={handleChangeSearch}
                placeholder="Rechercher des articles"
              />
            </div>

            <div>
              <label className="switch">
                Tri par prix :
                <input
                  type="checkbox"
                  checked={isPriceDesc}
                  onChange={handleChangePriceSorting}
                />
                <div className="slider">
                  <span className={isPriceDesc ? "checked" : ""}>↑</span>
                </div>
              </label>

              <DoubleRange
                priceRange={priceRange}
                onChange={handleChangePriceRange}
                min={0}
                max={1000}
              />
            </div>
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
