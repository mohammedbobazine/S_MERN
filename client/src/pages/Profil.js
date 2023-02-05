import React, { useContext } from "react";
import Log from "../components/Log/index";
import UpdatePorfil from "../components/Porfil/UpdatePorfil";

import { UidContext } from "../components/Routes/AppContext";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <UpdatePorfil />
      ) : (
        <div className="log-container">
          <Log singin={false} singup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
