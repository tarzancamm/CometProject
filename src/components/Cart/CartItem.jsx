import React from "react";

import styles from "./CartItem.module.css";

const CartItem = (props) => {

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.desc}>
          <span className={styles.price}>{props.price}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>REMOVE</button>
      </div>
    </li>
  );
};

export default CartItem;
