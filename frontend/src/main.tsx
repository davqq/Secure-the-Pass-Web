import React from "react";
import ReactDOM from "react-dom/client";
import Home, { loader as homeLoader } from "./routes/Home";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import Dashboard from "./routes/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/errorpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "*",
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/logout",
    loader: () => {
      document.cookie = "";
      window.location.replace("/login");
    },
    element: <div />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLInputElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
