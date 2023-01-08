import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetailsScreen.module.css";

const ProductDetailsScreen = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const url = "http://localhost:5555";

  useEffect(() => {
    axios.get(`${url}/products/${id}`).then((res) => {
      setProduct(res.data);
      console.log(res.data);
    });
  }, [id]);

  return (
    <section className={styles["product-details"]}>
      <div>ProductDetailsScreen</div>
    </section>
  );
};

export default ProductDetailsScreen;
