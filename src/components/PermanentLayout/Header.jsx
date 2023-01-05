import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";

import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  const [searchedProducts, setSearchedProducts] = useState("");
  const authCtx = useContext(AuthContext);

  const changeProductsHandler = (event) => {
    setSearchedProducts(event.target.value);
  };

  return (
    <header className={styles.header}>
      <p className={styles.logo}>Comet</p>
      <nav>
        <div>
          <ul className={styles.nav}>
            <li>
              <input
                type="text"
                onChange={changeProductsHandler}
                value={searchedProducts}
                placeholder="Search"
                className={styles.search}
              />
            </li>
            {authCtx.token && (
              <li>
                <button onClick={() => authCtx.logout()}>Logout</button>
              </li>
            )}
            {!authCtx.token && (
              <li>
                <NavLink to="/auth">Login</NavLink>
              </li>
            )}
            <li>
              <HeaderCartButton />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
