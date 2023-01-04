import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer;

// Holds valuus to be used by components?
const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
});

// Finds remaining time till expiration of localStorage login data
const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime(); //Current time in milliseconds since Jan 1, 1970
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

// Returns local data in an object
const getLocalData = () => {
  const localToken = localStorage.getItem("token");
  const localUserId = localStorage.getItem("userId");
  const localExp = localStorage.getItem("exp");

  const remainingExpTime = calculateRemainingTime(localExp);

  //Set to one hour
  if (remainingExpTime <= 6000) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("exp");
    return null;
  }

  return {
    token: localToken,
    userId: +localUserId,
    duration: remainingExpTime,
  };
};

// Auth Context Provider (will wrap index.js)
export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  let initialId;

  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
  }

  //Set initial state to initial Local Data
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);

  //Login and logout functionality (sets or clears localStorage data)
  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("exp");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, userId, exp) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("exp", exp);

    const remainingExpTime = calculateRemainingTime(exp);

    logoutTimer = setTimeout(logoutHandler, remainingExpTime); //Runs logout function after delay (remainingExpTime)
  };

  // Anytime localData changes or logoutHandler runs, logoutHandler is run after remainingExp duration
  useEffect(() => {
    if (localData) {
      logoutTimer = setTimeout(logoutHandler, localData.duration);
    }
  }, [localData, logoutHandler]);

  const contextValue = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
    userId: userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
