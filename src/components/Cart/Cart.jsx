import React, { useState, useContext } from "react";
import AuthContext from "../../store/authContext";
import axios from "axios";

import CartIcon from "./CartIcon";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [numCartItems, setNumCartItems] = useState("");
  const [showCart, setShowCart] = useState(false);
  const { userId } = useContext(AuthContext);
  const url = "http://localhost:5555";

  const getCart = () => {
    axios
      .get(`${url}/cart/${userId}`)
      .then((res) => {
        console.log(res.data);
        setNumCartItems(res.data.length);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Unable to add to cart");
      });
      setShowCart(true)
  };

  // Checks if cart has any items
  const cartHasItems = numCartItems > 0;

  // Calculates total price for items in cart
  const totalAmount = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].product.price;
    }
    return total.toFixed(2);
  };

  // Removes item from cart
  const removeCartItemHandler = (cartItemId) => {
    axios
      .delete(`${url}/cart/${cartItemId}`)
      .then(() => {
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Maps cart items into cart
  const theCart = (
    <ul>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.product.name}
          price={item.product.price}
          desc={item.product.desc}
          onRemove={() => removeCartItemHandler(item.id)}
        />
      ))}
    </ul>
  );

  return (
    <div>
      <button className={styles.cartbtn} onClick={getCart}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>{numCartItems}</span>
      </button>
      <div
        className={`${showCart ? styles["cart-show"] : styles["cart-hide"]} ${
          styles.modal
        }`}
      >
        <div>
          <button onClick={() => setShowCart(!showCart)}>X</button>
        </div>
        {theCart}
        {cartHasItems && (
          <button className={styles.checkout}>
            Checkout - {totalAmount(items)}
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
