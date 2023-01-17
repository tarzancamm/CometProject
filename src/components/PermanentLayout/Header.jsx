import React, { useState, useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";

import styles from "./Header.module.css";
import { FaUserAstronaut } from "react-icons/fa";
import logo from "../../assets/logo.png";
import Cart from "../Cart/Cart";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const autoScrollHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <header className={styles.header}>
        <NavLink to="/">
          <img className={styles.logo} src={logo} alt="" />
        </NavLink>
        <nav>
          <ul className={styles.nav}>
            <li>
              <FaUserAstronaut
                className={styles["user-icon"]}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
            </li>
            <li>
              <Cart />
            </li>
          </ul>
        </nav>
      </header>
      {dropdownOpen && (
        <div className={styles.dropdown}>
          {authCtx.token && (
            <button className={styles.link} onClick={() => {authCtx.logout(); setDropdownOpen(!dropdownOpen)}}>
              Logout
            </button>
          )}
          {!authCtx.token && (
            <NavLink
              className={styles.link}
              to="/auth"
              onClick={() => {setDropdownOpen(!dropdownOpen); autoScrollHandler()}}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Header;
