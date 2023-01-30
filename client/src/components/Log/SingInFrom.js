import React, { useState } from "react";
import axios from "axios";

const SingInFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const handleLogin = (e) => {};
  return (
    <form action="" onSubmit={handleLogin} id="sing-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => {
          setPassWord(e.target.value);
        }}
        value={password}
      />

      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SingInFrom;
