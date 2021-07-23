import axios from "axios";
import Cookies from "js-cookie";

import Header from "../../Components/Header/Header";

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Login.scss";

const Login = () => {
  const url = "https://api-vinted.herokuapp.com";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(url + "/user/login", fields);
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
    <div className="login">
      <Header />
      <form onSubmit={handleSubmit}>
        <div>Se connecter</div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handleChangePassword}
        />
        <button type="submit">Se connecter</button>
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        <div>{}</div>
      </form>
    </div>
  );
};

export default Login;
