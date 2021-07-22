import axios from "axios";

import Header from "../../Components/Header/Header";

import { useState } from "react";

import "./Signup.scss";

//Créer formulaire avec input contrôlé
//Créer requête Axios vers /user/signup
/*
{
  "username": "emmanuels",
  "password": "bestmdpever",
  "email": "emmanuel@vinted.com",
  "phone": "+33666778899"
}*/

const Signup = () => {
  const url = "https://api-vinted.herokuapp.com";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newletterSubscription, setNewletterSubscription] = useState(false);

  const handleChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleChangePhone = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleChangeNewletterSubscription = (e) => {
    const value = e.target.checked;
    setNewletterSubscription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = {
      username: username,
      email: email,
      password: password,
      phone: phone,
    };

    try {
      const response = await axios.post(url + "/user/signup", fields);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log(fields);
  };

  return (
    <div className="signup">
      <Header />
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleChangeUsername}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="tel"
          placeholder="Téléphone"
          value={phone}
          onChange={handleChangePhone}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handleChangePassword}
        />
        <div>
          <input
            type="checkbox"
            checked={newletterSubscription}
            onChange={handleChangeNewletterSubscription}
          />
          <span>S'inscrire à notre newletter</span>
        </div>
        <div>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
