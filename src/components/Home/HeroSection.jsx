import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h2>greatest gym shorts</h2>
        <h2>in the galaxy</h2>
        <a href="#product">shop now</a>
      </div>
    </div>
  );
};

export default HeroSection;
