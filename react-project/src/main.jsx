import React from 'react'
import ReactDOM from 'react-dom/client'
import Home, { loader as homeLoader } from './routes/Home'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Home />,
    loader: homeLoader
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
