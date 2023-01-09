import React, { useState, useContext } from "react";
import AuthContext from "../../store/authContext";
import axios from "axios";

import CartIcon from "./CartIcon";
import styles from "./Cart.module.css";

const HeaderCartButton = () => {
  const [numCartItems, setNumCartItems] = useState("");
  const [showCart, setShowCart] = useState(false)
  const { userId } = useContext(AuthContext);
  const url = "http://localhost:5555";

  const getCart = () => {
    axios
      .get(`${url}/cart/${userId}`)
      .then((res) => {
        console.log(res.data);
        setNumCartItems(res.data.length);
      })
      .then(() => {
        setShowCart(!showCart)
      })
      .catch((err) => {
        console.log(err);
        console.log("Unable to add to cart");
      });
  };

  return (
    <button className={styles.cartbtn} onClick={getCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>{numCartItems}</span>
      <div className={showCart ? "cart-show" : "cart-hide"}>
        cart
      </div>
    </button>
  );
};

export default HeaderCartButton;
