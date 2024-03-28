import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);

  // Fonction qui est déclenchée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    // Empêche le rafraichissement par défaut du navigateur lors de la soumission
    event.preventDefault();

    // Si le mot de passe rentré par l'utilisateur fait plus de 8 caractères de long, je fais un truc
    if (password.length > 8) {
      setShowError(false);
      alert("Formulaire validé");
    } else {
      // Je fais apparaître mon message d'erreur
      setShowError(true);
    }
    // Sinon je fais autre chose
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      // onSubmit sera déclenché lors du clique sur un bouton ou un input de type submit présent dans mon form
      onSubmit={handleSubmit}
    >
      <input
        // Mon input est de type email
        value={email}
        type="email"
        placeholder="azerty@mail.com"
        name="email"
        // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
        onChange={handleEmailChange}
      />
      <input
        value={username}
        type="text"
        placeholder="Jean Dupont"
        name="username"
        onChange={(event) => {
          // Je stocke dans mon state le contenu de mon input
          setUsername(event.target.value);
        }}
      />
      <input
        value={password}
        type="password"
        placeholder="AzErty657djzehjd"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {/* <button type="submit">Envoyer</button> */}
      {/* Cliquer sur ce bouton déclenche le onSubmit du formulaire */}
      {/* <button type="submit">Valider</button> */}
      <input type="submit" value="Send ===>" />
      {/* Condition qui gère l'affichage ou non de mon message d'erreur */}

      {showError === true && (
        <p style={{ color: "red" }}>
          Votre mot de passe doit faire plus de 8 caractères
        </p>
      )}
    </form>
  );
};

export default Signup;
