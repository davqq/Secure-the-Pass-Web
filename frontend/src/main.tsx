import React from "react";
import ReactDOM from "react-dom/client";
import AccountsOverview from "./routes/AccountsOverview";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountDetails from "./routes/accountDetails";
import SignUp from "./routes/signup";
import SignIn from "./routes/signin";
import "./index.css";
import Logout from "./routes/logout";
import getCookie from "./helper/getCookie";
import env from "react-dotenv";
import NewAccount from "./routes/newAccount";
import ForgotPasswordPage from "./routes/forgotPassword";
import Root from "./routes/root";

export const checktoken = async () => {
  fetch(`${env.API_URL}/checktoken`, {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Authorization", `${getCookie("jwt")}`],
    ],
  }).then((result) => {
    console.log(window.location);
    if (result.status === 403 || result.status === 401) {
      return window.location.replace("/logout");
    } else if (!window.location.pathname.includes("/accounts")) {
      return window.location.replace("/accounts");
    }
  });

  return <Root />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: checktoken,
  },
  {
    path: "/accounts",
    element: <AccountsOverview />,
    loader: checktoken,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/accounts/:accountId",
        element: <AccountDetails />,
        errorElement: <ErrorPage />,
        loader: checktoken,
      },
      {
        path: "/accounts/:accountId/edit",
        errorElement: <ErrorPage />,
        loader: checktoken,
      },
      {
        path: "/accounts/:accountId/remove",
        errorElement: <ErrorPage />,
        loader: checktoken,
      },
      {
        path: "/accounts/new",
        errorElement: <ErrorPage />,
        loader: checktoken,
        element: <NewAccount />,
      },
    ],
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <SignIn />,
  },
  {
    path: "/register",
    errorElement: <ErrorPage />,
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    errorElement: <ErrorPage />,
    element: <ForgotPasswordPage />,
  },
  {
    path: "/logout",
    errorElement: <ErrorPage />,
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
