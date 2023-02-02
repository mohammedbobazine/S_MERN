import React, { useState } from "react";
import axios from "axios";

const SingUpFrom = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setConstrolPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    termsError.innerHTML = "";
    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) {
        passwordConfirmError.innerHTML =
          "les mot de passe ne correspandent pas !";
      }

      if (!terms.checked) {
        termsError.innerHTML = "Veuillez valider les conditions générales";
      }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          pseudoError.innerHTML = "";
          emailError.innerHTML = "";
          passwordError.innerHTML = "";

          if (res.data.errors !== undefined) {
            if (res.data.errors.password !== "") {
              passwordError.innerHTML = res.data.errors.password;
            } else if (res.data.errors.pseudo !== "") {
              pseudoError.innerHTML = res.data.errors.pseudo;
            } else if (res.data.errors.email !== "") {
              emailError.innerHTML = res.data.errors.email;
            }
          } else {
            console.log(res);
            window.location = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <form action="" onSubmit={handleRegister} id="sing-up-form">
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input
        type="text"
        name="pseudo"
        id="pseudo"
        onChange={(e) => {
          setPseudo(e.target.value);
        }}
        value={pseudo}
      />
      <div className="pseudo error"></div>
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
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
          setPassword(e.target.value);
        }}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <label htmlFor="password-conf">Confirmer mot de passe</label>
      <input
        type="password"
        name="password"
        id="password-conf"
        onChange={(e) => {
          setConstrolPassword(e.target.value);
        }}
        value={controlPassword}
      />
      <div className="password-confirm error"></div>
      <br />
      <input type="checkbox" name="" id="terms" />
      <label htmlFor="terms">
        j'accepte les{" "}
        <a href="/" target="_blank" rel="noopener noreferrer">
          condtion générales
        </a>
      </label>
      <div className="terms error"></div>
      <br />

      <input type="submit" value="Valider inscription" />
    </form>
  );
};

export default SingUpFrom;
