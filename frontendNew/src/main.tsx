import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountDetails from "./routes/accountDetails";
import SignUp from "./routes/signup";
import SignIn from "./routes/signin";
import "./index.css";
import Logout from "./routes/logout";
import getCookie from "./helper/getCookie";
import env from "react-dotenv";

export const checktoken = async () => {
  fetch(`${env.API_URL}/checktoken`, {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Authorization", `${getCookie("jwt")}`],
    ],
  }).then((result) => {
    if (result.status === 403 || result.status === 401) {
      return window.location.replace("/logout");
    }
  });

  if (localStorage.getItem("dark") === "true") {
    (document.querySelector("body") as HTMLBodyElement).classList.add("dark");
  }

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: checktoken,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/account/:accountId",
        element: <AccountDetails />,
        loader: checktoken,
      },
      {
        path: "/account/:accountId/edit",
        loader: checktoken,
      },
      {
        path: "/account/:accountId/remove",
        loader: checktoken,
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
    path: "/logout",
    errorElement: <ErrorPage />,
    loader: Logout,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
