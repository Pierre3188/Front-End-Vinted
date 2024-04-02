import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Offer.css";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const Offer = (token) => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const url = "https://lereacteur-vinted-api.herokuapp.com/offer/" + id;

  const fetchData = async () => {
    const response = await axios.get(url);
    setOffer(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="offer-page">
          <div className="container_offer">
            <img src={offer.product_pictures[0].secure_url} alt="photo" />
            <div className="right-panel">
              <span>{offer.product_price} €</span>
              <section className="product-details">
                {offer.product_details.map((detail, index) => {
                  return (
                    <div key={index}>
                      <div className="key">{Object.keys(detail)}</div>
                      <div className="value">{detail[Object.keys(detail)]}</div>
                    </div>
                  );
                })}
              </section>
              <div className="description">
                <h2>{offer.product_name}</h2>
                <p>{offer.product_description}</p>
                <div className="owner2">
                  {Object.keys(offer.owner.account).includes("avatar") && (
                    <img src={offer.owner.account.avatar.url} alt="avatar" />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
              </div>
              {token ? (
                <button
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        title: offer.product_name,
                        price: offer.product_price,
                      },
                    })
                  }
                  className="green"
                >
                  Acheter
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login", {})}
                  className="green"
                >
                  Acheter
                </button>
              )}
            </div>
          </div>
          ;
        </div>
      )}
    </>
  );
};
export default Offer;
