import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProductCard.module.css";

const ProductCard = (props) => {
  const navigate = useNavigate();

  // Navigate to product details screen
  const handleShopBtn = () => {
    navigate(`/products/${props.products.id}`);
    window.scrollTo(0, 0) // Scrolls to top of product details screen
  };

  return (
    <div className={styles["product-card"]}>
      <img
        className={styles.image}
        src={props.products.photos[0].url}
        alt="shorts"
        onClick={handleShopBtn}
      />
      <div className={styles["product-card__details"]}>
        <div className={styles["product-card__desc"]}>
          <p className={styles.name} onClick={handleShopBtn}>{props.products.name}</p>
          <p className={styles.desc}>{props.products.description}</p>
        </div>
        <div className={styles["product-card__price"]}>
          <p className={styles.price}>${props.products.price}</p>
          <button className={styles["product-card__btn"]} onClick={handleShopBtn}>
            SHOP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
