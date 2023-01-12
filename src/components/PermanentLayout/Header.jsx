import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";

import styles from "./Header.module.css";
import logo from '../../assets/logo.png'
import Cart from "../Cart/Cart";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <NavLink to='/'><img className={styles.logo} src={logo} alt="" /></NavLink>
      <nav>
        <div>
          <ul className={styles.nav}>
            {authCtx.token && (
              <li>
                <button className={styles.link} onClick={() => authCtx.logout()}>Logout</button>
              </li>
            )}
            {!authCtx.token && (
              <li>
                <NavLink className={styles.link} to="/auth">Login</NavLink>
              </li>
            )}
            <li>
              <Cart />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
