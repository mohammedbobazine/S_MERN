import React, { useState } from "react";
import axios from "axios";

const SingInFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res.data.password);

        if (res.data.email !== undefined || res.data.password !== undefined) {
          emailError.innerHTML = res.data.email;
          passwordError.innerHTML = res.data.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div className="email error"></div>
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
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SingInFrom;
