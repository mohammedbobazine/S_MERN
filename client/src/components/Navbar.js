import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { UidContext } from "./Routes/AppContext";
const Navbar = () => {
  const uid = useContext(UidContext);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact="true" to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon " />
              <h3>Twitter Du Bled</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welocom">
              <NavLink exact="true" to="/profil">
                <h5>Bienvenue 'valeur dynamique'</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact="true" to="/profil">
                <img src="./img/icons/login.svg" alt="icon" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
