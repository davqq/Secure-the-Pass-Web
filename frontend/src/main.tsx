import React from "react";
import ReactDOM from "react-dom/client";
import Home, { loader as homeLoader } from "./routes/Home";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import Dashboard, { loader as dashboardLoader } from "./routes/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/errorpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: dashboardLoader,
        element: <Dashboard />,
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
