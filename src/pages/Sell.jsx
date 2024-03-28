import { Link } from "react-router-dom";

const Sell = () => {
  return (
    <div>
      <h1>Je suis la page caca</h1>
      <Link to="/">
        <div>
          <section>
            <p>Retour vers Home</p>
          </section>
        </div>
      </Link>
    </div>
  );
};

export default Sell;
