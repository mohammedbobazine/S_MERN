import React from "react";
import Log from "../components/Log/index";

const Profil = () => {
  return (
    <div className="profil-page">
      <div className="log-container">
        <Log singin={false} singup={true} />
        <div className="img-container">
          <img src="./img/log.svg" alt="img-log" />
        </div>
      </div>
    </div>
  );
};

export default Profil;
