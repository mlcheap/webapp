import React from "react";
import "./App.css";
import { userInfo, setUser } from "./services/userInfo";
import { useRoutes } from "react-router-dom";
import { baseRoutes } from "./routes";

function App() {
  const user = userInfo();
  let isLogin = user && user.access_token;
  let routing = useRoutes(baseRoutes(isLogin, setUser));
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <div className="wrapper">{routing}</div>
    </div>
  );
}

export default App;
