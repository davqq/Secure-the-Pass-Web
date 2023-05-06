import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root, { loader as rootLoader } from "./routes/root";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountDetails from "./routes/accountDetails";
import SignUp from "./routes/signup";
import SignIn from "./routes/signin";
import Logout from "./routes/logout";

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
      {
        path: "/account/:accountId/edit",
      },
      {
        path: "/account/:accountId/remove",
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
