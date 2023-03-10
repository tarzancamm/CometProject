import React, { useState, useContext } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import AuthContext from "../../store/authContext";
import axios from "axios";
import Swal from "sweetalert2";

import CartIcon from "./CartIcon";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [numCartItems, setNumCartItems] = useState("");
  const [showCart, setShowCart] = useState(false);
  const { userId } = useContext(AuthContext);
  const url = "http://localhost:5555";

  // Sets state for number of cart items and items (including photo)
  const getCart = () => {
    axios
      .get(`/cart/${userId}`)
      .then((res) => {
        console.log(res.data);
        setNumCartItems(res.data.length);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Unable to add to cart");
      });
    setShowCart(true);
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
      .delete(`/cartitem/${cartItemId}`)
      .then(() => {
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkoutHandler = () => {
    axios
      .delete(`/cart/${userId}`) // userId garnered from authContext
      .then(() => {
        getCart();
        Swal.fire({
          icon: "success",
          iconColor: "#C6CA53",
          color: "#0E181B",
          title: "Your Shorts Are On The Way",
          padding: "2rem 2rem 5rem 2rem",
          showConfirmButton: false,
          timer: "2300",
          timerProgressBar: true,
        });
        console.log("Cart deleted (checkout)");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Maps cart items into cart
  const TheCart = (
    <ul className={styles.carty}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.product.name}
          price={item.product.price}
          desc={item.product.desc}
          photo={item.product.photos[0].url}
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
        <div className={styles["cart-content"]}>
          <button
            className={styles["exit-btn"]}
            onClick={() => setShowCart(!showCart)}
          >
            <HiArrowLongRight />
          </button>
          <div className={styles.cartitems}>
            {items.length > 0 ? TheCart : <h4>Your Cart Is Empty</h4>}
            {cartHasItems && (
              <button className={styles.checkout} onClick={checkoutHandler}>
                checkout - ${totalAmount(items)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
