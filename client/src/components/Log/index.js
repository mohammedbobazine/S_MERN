import React, { useState } from "react";
import SingInFrom from "./SingInFrom";
import SingUpFrom from "./SingUpFrom";

const Log = (props) => {
  const [singUpModal, setSingUpModal] = useState(props.singup);
  const [singInModal, setSingInModal] = useState(props.singin);

  const handleModals = (e) => {
    if (e.target.id === "registrer") {
      setSingInModal(false);
      setSingUpModal(true);
    } else if (e.target.id === "login") {
      setSingInModal(true);
      setSingUpModal(false);
    }
  };
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="registrer"
            className={singUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={singInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {singInModal && <SingInFrom />}
        {singUpModal && <SingUpFrom />}
      </div>
    </div>
  );
};

export default Log;
