import "./Checkout.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import CheckoutForm from "../components/CheckoutForm";

// Je me connecte à mon compte Stripe
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function Checkout(token) {
  // On imagine qu'on a reçu le prix de la future transaction
  const location = useLocation();
  const { title, price } = location.state;
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();
  let total = 0;
  const options = {
    // Type de la transaction
    mode: "payment",
    // Montant de la transaction
    amount: Number((price * 100).toFixed(0)),
    // Devise de la transaction
    currency: "eur",
  };
  console.log((price * 100).toFixed(0));
  total = Number(price.toFixed(0)) + 0.4 + 0.8;
  // Le composant Elements doit contenir toute la logique de paiement
  // On lui donne la preuve qu'on s'est connecté à notre compte et les options de paiement
  console.log(token);
  return (
    <>
      {token ? (
        <div>
          <div className="container">
            <h2> Résumé de la commande</h2>
            <div className="cmdprice">
              <p> Commande </p>
              <p>{price}€</p>
            </div>
            <div className="buyprice">
              <p> Frais protection acheteurs </p>
              <p>0.40€</p>
            </div>
            <div className="transportprice">
              <p> Frais de port</p>
              <p>0.80€</p>
            </div>
            <div className="total">
              <p> Total</p>
              <p>{total}€</p>
            </div>
            <div className="blabla">
              <p>
                {" "}
                Il ne vous reste plus qu'une étape pour vous offrir{" "}
                <span className="arttitle">{title}</span>. Vous allez payer{" "}
                <span className="artprice">{total}€</span> (frais de protection
                et de frais port inclus).
              </p>
            </div>
          </div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm title={title} price={price} />
          </Elements>
        </div>
      ) : (
        navigate("/")
      )}
      ;
    </>
  );
}

export default Checkout;
