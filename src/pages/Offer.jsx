import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Offer.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

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
                {offer.product_details.map((detail) => {
                  return (
                    <div>
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
              <button className="green">Acheter</button>
            </div>
          </div>
          ;
        </div>
      )}
    </>
  );
};
export default Offer;
