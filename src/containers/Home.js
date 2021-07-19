import { Link } from "react-router-dom";

import Header from "../Components/Header/Header";

import "./Home.scss";

const Home = (props) => {
  const { isLoading, offers } = props;

  return (
    <div className="home">
      <Header />
      <div className="ready">
        <div className="container">
          <div>
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <div className="offers">
        {isLoading
          ? "Chargement en cours"
          : offers.map((e, i) => (
              <Link to={"/offer/" + e._id}>
                <div key={i} className="offer-item">
                  <div key={e._id}>{e.owner.account.username}</div>
                  <img src={e.product_image.secure_url} alt="" />
                  <div>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(e.product_price)}
                  </div>
                  <div>{e.product_details[0].MARQUE}</div>
                  <div>{e.product_details[1].TAILLE}</div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Home;
