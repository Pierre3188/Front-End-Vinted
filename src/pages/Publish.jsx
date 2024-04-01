import { useState } from "react";
import "./Publish.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";

const Publish = () => {
  const [username, setUsername] = useState("");
  // State qui contient mon image sélectionnée
  const [picture, setPicture] = useState([]);
  // State qui contient l'url fourni par cloudinary
  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();
  const [title, setTitle] = useState("");
  const [change, setChange] = useState(false);
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get("token");
    console.log(token, title, desc, price);
    try {
      // Je crée une nouvelle instance du constructeur FormData
      const formData = new FormData();
      // Rajouter 2 paires clef/valeur à mon formdata
      formData.append("name", username);
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("price", price);
      formData.append("condition", state);
      formData.append("city", place);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      console.log(picture.length);
      formData.append("picture", picture);
      // for (let i = 0; i < picture.length; i++) {
      //   formData.append("picture", picture[i]);
      // }
      console.log({ picture });

      // Je donne 3 arguments à axios.post :
      // - L'URL à interroger
      // - le body, ici un formData
      // - Les potentiels headers à envoyer : ici un token et le type du body que j'envoie
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setPictureFromCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  function handleChange(e) {
    setChange(e.target.checked);
  }
  return (
    <>
      <div className="photo-bloc">
        <h1>Vends ton article</h1>
        {pictureFromCloudinary && <img src={pictureFromCloudinary} alt="" />}
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <input
            multiple // Pour sélectionner plusieurs fichiers
            type="file"
            onChange={(event) => {
              let i = 0;
              while (event.target.files[i]) {
                setPicture(event.target.files[i]);
                console.log("test", event.target.files[i]);
                i = i + 1;
              }
            }}
          />
        </form>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="seconddiv">
          <div className="divtitle">
            <h2>Titre</h2>
            <input
              className="title"
              // Mon input est de type email
              value={title}
              type="texte"
              placeholder="ex: Chemise Sézane verte"
              name="title"
              // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="descart">
            <h2>Décris ton article</h2>
            <input
              className="desc"
              // Mon input est de type email
              value={desc}
              type="texte"
              placeholder="ex: porté quelques fois, taille correctement"
              name="desc"
              // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="thirddiv">
          <div className="divbrand">
            <h2>Marque</h2>
            <input
              className="brand"
              // Mon input est de type email
              value={brand}
              type="texte"
              placeholder="ex: Zara"
              name="brand"
              // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="divsize">
            <h2>Taille</h2>
            <input
              className="size"
              // Mon input est de type email
              value={size}
              type="texte"
              placeholder="ex: L / 40 / 12"
              name="size"
              // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="divcolor">
            <h2>Couleur</h2>
            <input
              className="color"
              // Mon input est de type email
              value={color}
              type="texte"
              placeholder="ex: Fushia"
              name="color"
              // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="divstate">
            <h2>Etat</h2>
            <input
              className="state"
              // Mon input est de type email
              value={state}
              type="texte"
              placeholder="Neuf avec étiquette"
              name="state"
              // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
              onChange={(event) => {
                setState(event.target.value);
              }}
            />
          </div>
          <div className="divplace">
            <h2>Lieu</h2>
            <input
              className="place"
              // Mon input est de type email
              value={place}
              type="texte"
              placeholder="ex: Toulouse"
              name="place"
              // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
              onChange={(event) => {
                setPlace(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="fourthdiv">
          <div className="divprice">
            <h2>Prix</h2>
            <input
              className="price"
              // Mon input est de type email
              value={price}
              type="texte"
              placeholder="0,00€"
              name="price"
              // Quand le contenu de mon input change, cette callback est appelée avec l'événement (un objet) en argument
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div className="divcheckbox">
            <div>
              <input
                className="checkbox"
                type="checkbox"
                checked={change}
                value="value"
                onChange={handleChange}
              />
              <h3> Je suis intéressé(e) par les échanges</h3>
            </div>
          </div>
        </div>
        <div className="divbutton">
          <div>
            <input className="submit" type="submit" value="Ajouter" />
          </div>
        </div>
      </form>
    </>
  );
};

export default Publish;
