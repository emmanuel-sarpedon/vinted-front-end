import axios from "axios";
import Cookies from "js-cookie";

import Header from "../../Components/Header/Header";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Signup.scss";

const Signup = () => {
  const url = "https://api-vinted.herokuapp.com";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newletterSubscription, setNewletterSubscription] = useState(false);

  let history = useHistory();

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
      if (response.status === 200) {
        Cookies.set("token", response.data.token);
        history.push("/");
      } else {
        alert(response);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="signup">
      <Header />
      <form onSubmit={handleSubmit}>
        <div>S'inscrire</div>
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
          minLength="10"
          maxLength="10"
          pattern="[0-9]{10}"
          onChange={handleChangePhone}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handleChangePassword}
        />
        <div className="newletter">
          <div>
            <input
              type="checkbox"
              checked={newletterSubscription}
              onChange={handleChangeNewletterSubscription}
            />
            <span>S'inscrire à notre newletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
