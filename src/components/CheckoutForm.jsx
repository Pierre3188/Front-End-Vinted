import {
  PaymentElement,
  //   CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./CheckoutForm.css";

import { useState } from "react";
import UpdateArticle from "./UpdateArticle";

const CheckoutForm = ({ title, price }) => {
  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [isLoading, setIsLoading] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [paymentIsDone, setPaymentIsDone] = useState(false);

  // Va nous permettre de faire des requêtes à stripe pour valider le paiement
  const stripe = useStripe();

  // Va nous permettre de récupérer le contenu des inputs
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On commence à charger
    setIsLoading(true);
    try {
      // Si il y a un problème avec elements on avorte la transaction
      if (elements == null) {
        return;
      }

      //   On fait une requête à Stripe pour vérifier si tout est bon dans les inputs, on destructure la clef error de la réponse et on la renomme submitError
      const { error: submitError } = await elements.submit();

      // Affiche l'erreur en question
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: price,
        }
      );
      const clientSecret = response.data.client_secret;
      console.log(clientSecret);

      // Requête à Stripe pour valider le paiement
      const { error, paymentIntent } = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements: elements,
        clientSecret: clientSecret,
        // Éventuelle redirection
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        // Bloque la redirections
        redirect: "if_required",
      });

      console.log(paymentIntent);

      // Si une erreur a lieu pendant la confirmation
      if (error) {
        // On la montre au client
        setErrorMessage(error.message);
      }

      // Si on reçois un status succeeded on fais passer completed à true
      if (paymentIntent.status === "succeeded") {
        setPaymentIsDone(true);
      }
      // On a fini de charger

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return paymentIsDone ? (
    <div className="thanks">
      <p>Merci pour votre achat</p>
      <UpdateArticle title={title} amount={price}></UpdateArticle>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {/* <CardElement /> */}
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Pay
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
