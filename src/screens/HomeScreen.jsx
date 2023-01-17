import React, { useState, useEffect } from "react";
import axios from "axios";
import HeroSection from "../components/Home/HeroSection";
import ProductContainer from "../components/Home/ProductContainer";

import styles from "./HomeScreen.module.css";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    const url = "http://localhost:5555";

    axios
      .get(`${url}/products`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Runs once when page first loads
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <HeroSection />
      <div className={styles.intro}>
        <div className={styles.content}>
          <h2 className={styles["intro-title"]}>
            YOUR NEW GO-TO GYM SHORTS.
          </h2>
          <p className={styles["intro-description"]} id="product">
            Our shorts leave aliens speechless, boomers in stretchers, and your
            mom worried about other girls at the gym. Designed to balance
            performance with style. Tested by atheletes.
          </p>
        </div>
        {/* <input
          type="text"
          onChange={changeProductsHandler}
          value={searchedProducts}
          placeholder="Search"
          className={styles.search}
        /> */}
      </div>
      <ProductContainer products={products} />
    </div>
  );
};

export default HomeScreen;
