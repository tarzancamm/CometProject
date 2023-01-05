import React, { useState, useContext, useReducer } from "react";
import AuthContext from "../../store/authContext";
import axios from "axios";
// import cx from "classnames";
import styles from "./Auth.module.css";


const usernameReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {value: action.payload, isValid: action.payload.includes('@')}
    case "INPUT_BLUR":
      return {value: prevState.value, isValid: prevState.value.includes("@")}
    default:
      return {value: "", isValid: false}
  }
}

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {value: action.payload, isValid: action.payload.length > 6}
    case "INPUT_BLUR":
      return {value: prevState.value, isValid: prevState.value.length > 6}
    default:
      return {value: "", isValid: false}
  }
}


const Auth = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: '',
    isValid: null,
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  const authCtx = useContext(AuthContext);

  // Handlers for sending data to useReducer (input & validation)
  const usernameChangeHandler = (e) => {
    dispatchUsername({type: "USER_INPUT", payload: e.target.value})
  }
  const passwordChangeHandler = (e) => {
    dispatchPassword({type: "USER_INPUT", payload: e.target.value})
  }
  const validateUsernameHandler = () => {
    dispatchUsername({type: "INPUT_BLUR"})
  }
  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"})
  }

  // Handler for submission of form
  const submitHandler = (e) => {
    e.preventDefault();

    const url = "http://localhost:5555";

    const body = {
      firstName: firstName,
      lastName: lastName,
      username: usernameState.value,
      password: passwordState.value,
    };

//! Must find out how to reset state to empty strings
    axios
    .post(register ? `${url}/register` : `${url}/login`, body)
    .then((res) => {
      authCtx.login(res.data.token, res.data.userId, res.data.exp)
      // setFirstName('')
      // setLastName('')
      // setPassword('')
      // setUsername('')
    })
    .catch((err) => {
      // setFirstName('')
      // setLastName('')
      // setPassword('')
      // setUsername('')
      console.log(err)
    });
    console.log('Login or Register submission handler called frontend')
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
            value={usernameState.value}
            onChange={usernameChangeHandler}
            onBlur={validateUsernameHandler}
          />
          <input
            className={styles["form-input"]}
            type="text"
            placeholder="Enter password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
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
