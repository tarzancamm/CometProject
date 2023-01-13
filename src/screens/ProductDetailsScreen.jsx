import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import axios from "axios";
import { GrStar } from "react-icons/gr";
import Swal from "sweetalert2";

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
      .post(`${url}/cartitem/${id}`, body)
      .then((res) => {
        Swal.fire({
          icon: "success",
          iconColor: '#477998',
          color: '#0E181B',
          title: "Added to Cart",
          showConfirmButton: false,
          padding: '1.2rem 0 4rem 0',
          timer: '1200',
        });
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
        <div className={styles["details-rating"]}>
          <GrStar />
          <GrStar />
          <GrStar />
          <GrStar />
          <GrStar />
          <p>(64)</p>
        </div>
        <p className={styles["details-price"]}>${product.price}</p>
        <div className={styles.size}>
          <h4>Size:</h4>
          <form>
            <input type="radio" name="size" />
            <label htmlFor="Small">S</label>
            <input type="radio" name="size" />
            <label htmlFor="Small">M</label>
            <input type="radio" name="size" />
            <label htmlFor="Small">L</label>
            <input type="radio" name="size" />
            <label htmlFor="Small">XL</label>
          </form>
        </div>
        <div className={styles.addtocart}>
          <p>
            Get it by <span>Wednesday, February 27th</span>
          </p>
          <button className={styles.cartbtn} onClick={addToCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsScreen;
