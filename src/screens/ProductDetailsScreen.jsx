import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import axios from "axios";
import { GrStar } from "react-icons/gr";
import styles from "./ProductDetailsScreen.module.css";

const ProductDetailsScreen = () => {
  const [product, setProduct] = useState({}); // Curly braces instead of bracket bc only one object
  const [image, setImage] = useState("");
  const { id } = useParams();
  const url = "http://localhost:5555";
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${url}/products/${id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
      let primaryPhoto = res.data.photos.filter((img) => {
        return img.primaryPhoto === true;
      });
      setImage(primaryPhoto[0].url);
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
      <img className={styles.img} src={image} alt="shorts" />
      <div className={styles.details}>
        <p className={styles["details-name"]}>{product.name}</p>
        <div className={styles['details-rating']}>
          <GrStar />
          <GrStar />
          <GrStar />
          <GrStar />
          <GrStar />
          <p>(64)</p>
        </div>
        <p className={styles["details-price"]}>{product.price}</p>
        <button className={styles.cartbtn} onClick={addToCartHandler}>
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductDetailsScreen;
