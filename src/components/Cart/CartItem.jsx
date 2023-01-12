import React from "react";

import styles from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={styles["cart-item"]}>
      <img className={styles.image} src={props.photo} alt="gym shorts" />
      <div className={styles.desc}>
        <h2>{props.name}</h2>
        <span className={styles.price}>${props.price}</span>
        <div className={styles.actions}>
          <button onClick={props.onRemove}>REMOVE</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
