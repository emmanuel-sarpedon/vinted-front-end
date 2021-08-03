import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import qs from "qs";

import Loader from "../../Components/Loader/Loader";

import "./Home.scss";
import tear from "../../assets/tear.svg";

import formatPrice from "../../helpers/formatPrice";

const Home = (props) => {
  const url = "https://api-vinted.herokuapp.com/offers?";

  const { search, isPriceDesc, priceMin, priceMax } = props;

  const location = useLocation();
  const params = qs.parse(location.search.substring(1)); // transform "?page=1" on object {page:1}
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 4;

  const sort = isPriceDesc ? "price-desc" : "price-asc";

  const [offers, setOffers] = useState([]);

  const [numberOfResults, setNumberOfResults] = useState();
  const [numberOfPages, setNumberOfPages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const queryParams = qs.stringify({
        page: page,
        limit: limit,
        title: search,
        sort: sort,
        priceMin: priceMin,
        priceMax: priceMax,
      });

      const response = await axios.get(url + queryParams);

      setOffers(response.data.offers);
      setNumberOfResults(response.data.count);
      setNumberOfPages(Math.ceil(response.data.count / limit));

      setIsLoading(false);
    }
    fetchData();
  }, [page, limit, search, sort, priceMin, priceMax]);

  const paginationLinks = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paginationLinks.push(
      <Link
        className={page === i || (!page && i === 1) ? "page active" : "page"}
        to={`?page=${i}`}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className="home">
      <div className="ready">
        <div className="container">
          <div>
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button>
              <Link to="/publish">Commencer à vendre</Link>
            </button>
          </div>
        </div>
        <img src={tear} alt="" />
      </div>
      <div>
        <div className="paging">
          <div className="results">Nombre de résultats : {numberOfResults}</div>
          <div className="pages">{paginationLinks}</div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="offers">
              {offers.map((e, i) => (
                <Link key={e._id} to={"/offer/" + e._id}>
                  <div className="offer-item">
                    <div className="username">{e.owner.account.username}</div>
                    <img src={e.product_image.secure_url} alt="" />
                    <div className="price">{formatPrice(e.product_price)}</div>
                    <div className="details">
                      {Object.values(e.product_details[0])}
                    </div>
                    <div className="details">
                      {Object.values(e.product_details[1])}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
