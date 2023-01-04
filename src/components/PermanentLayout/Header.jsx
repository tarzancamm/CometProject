import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  const [searchedProducts, setSearchedProducts] = useState("");

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
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
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
