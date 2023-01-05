import React from "react";
import HeroSection from "./HeroSection";
import ProductContainer from "./ProductContainer";

import styles from "./HomeScreen.module.css";

const HomeScreen = () => {
  return (
    <div>
      <HeroSection />
      <div className={styles.intro}>
        <h2 className={styles['intro-title']}>THE ONLY GYM SHORTS YOU'LL EVER NEED.</h2>
        <p className={styles["intro-description"]}>
          Our shorts leave aliens speechless, boomers in stretchers and your mom worried about other girls at the gym. Designed to balance performance with style. Tested by atheletes. Comet shorts might just be your new go-to.
        </p>
      </div>
      <ProductContainer />
    </div>
  );
};

export default HomeScreen;
