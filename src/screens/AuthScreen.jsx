import React, { useState, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import axios from "axios";
import styles from "./AuthScreen.module.css";

const usernameReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.payload, isValid: action.payload.includes("@") };
    case "INPUT_BLUR":
      return { value: prevState.value, isValid: prevState.value.includes("@") };
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.payload, isValid: action.payload.length > 6 };
    case "INPUT_BLUR":
      return { value: prevState.value, isValid: prevState.value.length > 6 };
    default:
      return { value: "", isValid: false };
  }
};

const AuthScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const navigate = useNavigate()

  // usernameReducer will automatically run when action is dispatched
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // Connection to authContext
  const authCtx = useContext(AuthContext);

  // Handlers for sending data to useReducer (input & validation)
  const usernameChangeHandler = (e) => {
    dispatchUsername({ type: "USER_INPUT", payload: e.target.value });
  };
  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", payload: e.target.value });
  };
  const validateUsernameHandler = () => {
    dispatchUsername({ type: "INPUT_BLUR" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

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
        authCtx.login(res.data.token, res.data.userId, res.data.exp);
          navigate(`/`);
          window.scrollTo(0, 0) // Scrolls to top of product details screen
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
        console.log(err);
      });
    console.log("Login or Register submission handler called frontend");
  };

  const { isValid: usernameIsValid } = usernameState;
  const { isValid: passwordIsValid } = passwordState;

  return (
    <div className={styles.page}>
      <div className={styles['title-container']}>
        <h2 className={styles.title}>{register ? "Sign Up" : "Login"}</h2>
      </div>
      <div className={styles.form}>
        <form className={styles["auth-form"]} onSubmit={submitHandler}>
          {register && (
            <input
              className={styles["form-input"]}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          )}
          {register && (
            <input
              className={styles["form-input"]}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          )}
          <input
            className={`${
              usernameIsValid === false ? styles.invalid : styles["form-input"]
            }`}
            type="text"
            placeholder="Email"
            value={usernameState.value}
            onChange={usernameChangeHandler}
            onBlur={validateUsernameHandler}
          />
          <input
            className={`${
              passwordIsValid === false ? styles.invalid : styles["form-input"]
            }`}
            type="password"
            placeholder="Password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <button className={styles["form-btn"]}>
            {register ? "Create" : "Sign In"}
          </button>
        </form>
        <button
          className={styles["form-btn-switch"]}
          onClick={() => setRegister(!register)}
        >
          {register ? "Login" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
