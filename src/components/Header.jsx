import logo from "../assets/img/logo.jpeg";
import "./Header.css";
import { ToggleSlider } from "react-toggle-slider";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header container-header">
      <Link to={`/home`}>
        <div className="logo">
          <img src={logo} alt="logo vinted" />
        </div>
      </Link>
      <div className="dispo-searchbar">
        <div className="searchbar">
          <form>
            <input
              type="text"
              class="search-input"
              placeholder="Recherche des articles"
            ></input>
          </form>
        </div>
        <div>
          <div className="price-sort">
            <span>Trier par prix :</span>
            <ToggleSlider className="toggle" />
          </div>

          <span className="price-between">Prix entre :</span>
        </div>
      </div>
      <div className="bandeau-nav">
        <nav>
          <div className="left-nav">
            <Link to={`/signup`}>
              <button className="inscr">S'inscrire</button>
            </Link>
            <Link to={`/login`}>
              <button className="connec">Se connecter</button>
            </Link>
            <Link to={`/sell`}>
              <button className="sell">Vends tes articles</button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
