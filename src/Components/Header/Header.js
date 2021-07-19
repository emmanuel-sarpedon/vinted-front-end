import vintedlogo from "../../assets/vinted_logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <img src={vintedlogo} alt="vinted-logo" />
      <div>
        <button>S'inscrire</button>
        <button>Se connecter</button>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
