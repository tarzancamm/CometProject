import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import axios from "axios";
import styles from "./ProductDetailsScreen.module.css";

const ProductDetailsScreen = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const url = "http://localhost:5555";
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${url}/products/${id}`).then((res) => {
      setProduct(res.data);
      console.log(res.data);
    });
  }, [id]);

  const addToCartHandler = () => {
    const body = {
      userId: authCtx.userId,
    };
    axios
      .post(`${url}/cart/${id}`, body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Unable to add to cart");
      });
  };

  return (
    <section className={styles["product-details"]}>
      <div className={styles.product}>
        {/* <img className={styles.image} src={product.photos[0].url} alt="shorts" /> */}
        <p>{product.name}</p>
        <p>{product.price}</p>
        <button onClick={addToCartHandler}>Add to Cart</button>
      </div>
    </section>
  );
};

export default ProductDetailsScreen;
