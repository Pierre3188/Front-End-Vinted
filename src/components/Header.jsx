import logo from "../assets/img/logo.jpeg";
import "./Header.css";
import { ToggleSlider } from "react-toggle-slider";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Login.jsx";
import { useState } from "react";

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  minval,
  setMinVal,
  maxval,
  setMaxVal,
  active,
  publishMem,
  setActive,
  setPublishMem,
}) => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="header container-header">
      <Link to={`/home`}>
        <div className="logo">
          <img src={logo} alt="logo vinted" />
        </div>
      </Link>
      <div className="searchbar">
        <form>
          <input
            type="text"
            className="search-input"
            placeholder="Recherche des articles"
            value={search}
            onChange={(event) => {
              // Je stocke dans mon state le contenu de mon input
              setSearch(event.target.value);
              console.log(search);
            }}
          ></input>
        </form>
        <div className="price-sort">
          <span className="price-sort-txt">Trier par prix :</span>
          <select
            value={active}
            onChange={(event) => {
              // Je stocke dans mon state le contenu de mon input
              setActive(event.target.value);
              console.log(event.target.value);
            }}
          >
            <option value="">Sans tri</option>
            <option value="price-asc">Prix du moins cher au plus cher</option>
            <option value="price-desc">Prix du plus cher au moins cher</option>
          </select>

          <span className="price-between">Prix entre :</span>
          <input
            type="text"
            className="priceMin"
            value={minval}
            onChange={(event) => {
              setMinVal(event.target.value);
            }}
          ></input>
          <input
            type="text"
            className="priceMax"
            value={maxval}
            onChange={(event) => {
              setMaxVal(event.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="bandeau-nav">
        <nav>
          <div className="left-nav">
            {token ? (
              <button className="deconn" onClick={() => handleToken(null)}>
                {" "}
                Se déconnecter
              </button>
            ) : (
              <>
                <Link to={`/signup`}>
                  <button className="inscr">S'inscrire</button>
                </Link>
                <Link to={`/login`}>
                  <button
                    className="connec"
                    onClick={() => {
                      setVisible(!visible); // on inverse la valeur de `visible` à chaque click
                    }}
                  >
                    Se connecter
                  </button>
                </Link>
              </>
            )}
            {token ? (
              <Link to={`/Publish`}>
                <button className="sell">Vends tes articles</button>
              </Link>
            ) : (
              <>
                <Link to={`/login`}>
                  <button
                    className="sell"
                    onClick={() => {
                      setPublishMem(true); // on inverse la valeur de `visible` à chaque click

                      navigate("/login");
                    }}
                  >
                    Vends tes articles
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
