import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [showError, setShowError] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // Fonction qui est déclenchée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();

    // Si le mot de passe rentré par l'utilisateur fait plus de 8 caractères de long, je fais un truc
    if (password.length > 8) {
      setShowError(false);

      useEffect(() => {
        const fetchData = async () => {
          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/signup",
            {
              email: email,
              username: username,
              password: password,
              newsletter: true,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setData(response.data);
          setIsLoading(false);
          console.log(response.data.email);
        };

        fetchData();
      }, []);
    } else {
      // Je fais apparaître mon message d'erreur
      setShowError(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div className="container-Signup">
      <div className="styleh2">
        <h2>S'inscrire</h2>
      </div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        // onSubmit sera déclenché lors du clique sur un bouton ou un input de type submit présent dans mon form
        onSubmit={handleSubmit}
      >
        <input
          className="username"
          value={username}
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          onChange={(event) => {
            // Je stocke dans mon state le contenu de mon input
            setUsername(event.target.value);
          }}
        />
        <input
          className="email"
          // Mon input est de type email
          value={email}
          type="email"
          placeholder="Email"
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
        {/* <button type="submit">Envoyer</button> */}
        {/* Cliquer sur ce bouton déclenche le onSubmit du formulaire */}
        {/* <button type="submit">Valider</button> */}
        <h3> S'inscrire à notre newsletter</h3>
        <span>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </span>

        <div>
          <input className="submit" type="submit" value="S'inscrire" />
        </div>
        <Link to={`/Login`}>
          <p className="alreadyaccount">Tu as déjà un compte? Connecte-toi !</p>
        </Link>
        {showError === true && (
          <p style={{ color: "red" }}>
            Votre mot de passe doit faire plus de 8 caractères
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
