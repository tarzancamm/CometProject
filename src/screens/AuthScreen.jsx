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
  const [register, setRegister] = useState(false);
  const [loginValid, setLoginValid] = useState(true);
  const [registerValid, setRegisterValid] = useState(true);
  const navigate = useNavigate();

  // usernameReducer will automatically run when action is dispatched
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: true,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: true,
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

    register &&
      axios
        .post(`/register`, body)
        .then((res) => {
          authCtx.login(res.data.token, res.data.userId, res.data.exp);
          navigate(`/`);
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log(err.message);
          setRegisterValid(false);
        });

    !register &&
      axios
        .post(`/login`, body)
        .then((res) => {
          authCtx.login(res.data.token, res.data.userId, res.data.exp);
          navigate(`/`);
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log(err);
          setLoginValid(false);
        });
  };

  const { isValid: usernameIsValid } = usernameState;
  const { isValid: passwordIsValid } = passwordState;

  return (
    <div className={styles.page}>
      <div className={styles["title-container"]}>
        <h2 className={styles.title}>{register ? "Sign Up" : "Login"}</h2>
      </div>
      <div className={styles.form}>
        <form className={styles["auth-form"]} onSubmit={submitHandler}>
          {!loginValid && (
            <p className={styles["invalid-entry"]}>
              Incorrect email or password
            </p>
          )}
          {!registerValid && (
            <p className={styles["invalid-entry"]}>Email already in use or invalid email/password</p>
          )}
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
          <div>
            {!usernameIsValid && (
              <p className={styles["invalid-entry"]}>Enter a valid email</p>
            )}
            <input
              className={`${
                usernameIsValid === false
                  ? styles.invalid
                  : styles["form-input"]
              }`}
              type="text"
              placeholder="Email"
              value={usernameState.value}
              onChange={usernameChangeHandler}
              onBlur={validateUsernameHandler}
            />
          </div>
          <div>
            {!passwordIsValid && (
              <p className={styles["invalid-entry"]}>
                Minimum 7 characters long
              </p>
            )}
            <input
              className={`${
                passwordIsValid === false
                  ? styles.invalid
                  : styles["form-input"]
              }`}
              type="password"
              placeholder="Password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
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
