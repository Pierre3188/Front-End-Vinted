import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Je suis la page details</h1>
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

export default Login;
