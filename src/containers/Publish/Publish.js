import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Loader from "../../Components/Loader/Loader";

import "./Publish.scss";

const Publish = (props) => {
  const { token } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const url = "https://api-vinted.herokuapp.com/offer/publish";

    const formData = new FormData();

    formData.append("picture", picture);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", price);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        history.push(`/offer/${response.data._id}`);
      } else {
        alert(response);
      }
    } catch (error) {
      alert(error);
    }

    setIsLoading(false);
  };

  return token ? (
    isLoading ? (
      <Loader />
    ) : (
      <div className="publish">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
          />
          <label>
            Titre
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Décris ton article
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Marque
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
          <label>
            Taille
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </label>
          <label>
            Couleur
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <label>
            Etat
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
          <label>
            Lieu
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Prix
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button>Envoyer</button>
        </form>
      </div>
    )
  ) : (
    <>{history.push("/login")}</>
  );
};

export default Publish;
