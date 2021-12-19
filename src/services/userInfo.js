import { useState } from "react";
import { singletonHook } from "react-singleton-hook";

console.log("localstorage", localStorage.getItem("user"));
const initUser = JSON.parse(localStorage.getItem("user"));
let currentUser = initUser;
let globalSetUser = () => {
  throw new Error(`you must useToken before setting its state`);
};
let globalDeleteUser = () => {
  throw new Error(`you must useToken before setting its state`);
};
export const userInfo = singletonHook(initUser, () => {
  const [user, setUser] = useState(initUser);
  globalSetUser = (user) => {
    setUser(user, localStorage.setItem("user", JSON.stringify(user)));
  };
  globalDeleteUser = () => {
    setUser({}, localStorage.removeItem("user"));
  };
  currentUser = user;
  return currentUser;
});

export const setUser = (user) => globalSetUser(user);
export const deleteUser = () => globalDeleteUser();
export const getUser = () => currentUser;
