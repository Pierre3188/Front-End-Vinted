import { useParams } from "react-router-dom";

const Offer = () => {
  //   const params = useParams();
  //   console.log(params.id);
  const { id } = useParams();

  return <h1>Je suis sur la page de l'offre dont l'id est {id}</h1>;
};

export default Offer;
