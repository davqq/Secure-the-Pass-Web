import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root, { loader as rootLoader } from "./routes/root";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountDetails from "./routes/AccountDetails";
import SignIn from "./signin";
import SignUp from "./signup";
import logout from "./logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/account/:accountId",
        element: <AccountDetails />,
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
    loader: logout,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
