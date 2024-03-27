import { Link } from "react-router-dom";

const Home = ({ str }) => {
  return (
    <div>
      <h1>Je suis la page d'accueil</h1>
      <Link to="/details">Cliquez ici pour aller ver sla page details</Link>
    </div>
  );
};

export default Home;
