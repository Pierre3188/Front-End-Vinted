import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    console.log(email, password);
    const fetchData = async () => {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      setData(response.data);
      console.log(response.data.token);
      Cookies.set("token", response.data.token, { expires: 15 });
    };

    fetchData();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="container-Login">
      <div className="styleh2">
        <h2>Se connecter</h2>
      </div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        // onSubmit sera déclenché lors du clique sur un bouton ou un input de type submit présent dans mon form
        onSubmit={handleSubmit}
      >
        <input
          className="email"
          // Mon input est de type email
          value={email}
          type="email"
          placeholder="Adresse email"
          name="email"
          // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
          onChange={handleEmailChange}
        />

        <input
          className="password"
          value={password}
          type="password"
          placeholder="Mot de passe"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <div>
          <input className="submit" type="submit" value="Se connecter" />
        </div>
        <Link to={`/Signup`}>
          <p className="noaccount">
            Pas encore de compte? Qu'est ce que tu fous? Inscris-toi !
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
