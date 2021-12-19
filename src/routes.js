import { Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login/login";
import SignUp from "./pages/auth/signup/signup";
import TaskPage from "./pages/app/pages/task/task";

import InitialPage from "./pages/app/pages/initial/initial";
import AppPage from "./pages/app/AppPages";
export const baseRoutes = (isLoggedIn, setUser) => [
  {
    path: "/app/*",
    element: isLoggedIn ? <AppPage /> : <Navigate to="/auth/login" />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: isLoggedIn ? (
          <Navigate to="/app/initial" />
        ) : (
          <LoginPage setUser={setUser} />
        ),
      },
      {
        path: "signup",
        element: isLoggedIn ? (
          <Navigate to="/app/initial" />
        ) : (
          <SignUp setUser={setUser} />
        ),
      },
    ],
  },
  {
    path: "/",
    // element: !isLoggedIn ? (
    //   <Navigate to="/auth/login" />
    // ) : (
    //   <Navigate to="/app/initial" />
    // ),
    element: <Navigate to="/auth/login" />,
  },
];
export const appRoutes = () => [
  {
    path: "/initial",
    element: <InitialPage />,
  },
  {
    path: "auth/login",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/new-task",
    element: <TaskPage />,
  },
];
