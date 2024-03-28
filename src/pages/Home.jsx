import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Offer from "./Offer";

const Home = ({ str }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      {data.offers.map((offer, index) => {
        console.log(offer);
        return (
          <Link key={offer._id} to={`/offer/${offer._id}`}>
            <article className="globaloffer">
              <div className="offer">
                {Object.keys(offer.owner.account).includes("avatar") && (
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt="avatar"
                  />
                )}
                <p>{offer.owner.account.username}</p>
              </div>

              <div className="main_pic">
                <img src={offer.product_image.secure_url} alt="img_Offer" />
                <div>
                  <p className="price_offer">
                    {" "}
                    {offer.product_price.toFixed(2)}€
                  </p>
                  {offer.product_details[1].TAILLE ? (
                    <p className="prd_size">
                      {offer.product_details[1].TAILLE}
                    </p>
                  ) : (
                    <p>
                      {" "}
                      <br></br>
                    </p>
                  )}
                  <p className="prd_brand">{offer.product_details[0].MARQUE}</p>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
};

export default Home;
