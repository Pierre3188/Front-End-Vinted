import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [showError, setShowError] = useState(false);
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Fonction qui est déclenchée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();
    try {
      // Si le mot de passe rentré par l'utilisateur fait plus de 8 caractères de long, je fais un truc
      if (password.length > 8) {
        setShowError(false);

        const fetchData = async () => {
          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/signup",
            {
              email: email,
              username: username,
              password: password,
              newsletter: newsletter,
            }
          );
          setData(response.data);
          console.log(response.data.token);
          handleToken(response.data.token);
          navigate("/");
        };

        fetchData();
      } else {
        // Je fais apparaître mon message d'erreur
        setShowError(true);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.reponse.status === 409) {
        setErrorMessage(true);
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  function handleChange(e) {
    setNewsletter(e.target.checked);
  }

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
        {avatar && <img src={URL.createObjectURL(avatar)} alt="produit" />}
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles.path)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="textavatar">
                  <p>Sélectionner un avatar</p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>

        {/* <button type="submit">Envoyer</button> */}
        {/* Cliquer sur ce bouton déclenche le onSubmit du formulaire */}
        {/* <button type="submit">Valider</button> */}
        <div className="divcheckbox">
          <div className="checkbox">
            <input
              type="checkbox"
              checked={newsletter}
              value="value"
              onChange={handleChange}
            />
          </div>
        </div>
        <h3> S'inscrire à notre newsletter</h3>
        <span className="legalcd">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </span>

        <div className="divsubmit">
          <input className="submitbutton" type="submit" value="S'inscrire" />
        </div>
        <div className="divaccount">
          <Link to={`/Login`}>
            <p className="alreadyaccount">
              Tu as déjà un compte? Connecte-toi !
            </p>
          </Link>
        </div>
        {showError === true && (
          <p style={{ color: "red" }}>
            Votre mot de passe doit faire plus de 8 caractères
          </p>
        )}
        {errorMessage === true && (
          <p style={{ color: "red" }}>This email has already an account</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
