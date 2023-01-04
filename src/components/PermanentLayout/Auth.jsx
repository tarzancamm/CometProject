import React, { useState, useContext } from "react";
import AuthContext from "../../store/authContext";
import axios from "axios";
import cx from "classnames";

import styles from "./Auth.module.css";

const Auth = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const url = "http://localhost:5433";

    const body = {
      firstName: firstName,
      lastName: lastName,
      username,
      password,
    };

    axios
    .post(register ? `${url}/register` : `${url}/login`, body)
    .then((res) => {
      authCtx.loginHandler(res.data.token, res.data.userId, res.data.exp)
    })
    .catch((err) => {
      setFirstName('')
      setLastName('')
      setPassword('')
      setUsername('')
    });
    console.log('Login or Register submission handler called')
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Login or Sign Up</h2>
      <div className={styles.form}>
        <form className={styles["auth-form"]} onSubmit={submitHandler}>
          {register && (
            <input
              className={styles["form-input"]}
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          )}
          {register && (
            <input
              className={styles["form-input"]}
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          )}
          <input
            className={styles["form-input"]}
            type="text"
            placeholder="Enter email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles["form-input"]}
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles["form-btn"]}>
            {register ? "Sign Up" : "Login"}
          </button>
        </form>
        <button
          className={styles["form-btn"]}
          onClick={() => setRegister(!register)}
        >
          {register ? "Need to login?" : "Need to sign up?"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
