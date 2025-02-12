import React from 'react';
import ReactDOM from 'react-dom/client';
import AccountsOverview from './routes/account/AccountOverview';
import ErrorPage from './error-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccountDetails from './routes/account/AccountDetails';
import SignUp from './routes/auth/Signup';
import SignIn from './routes/auth/Signin';
import './index.css';
import Logout from './routes/auth/Logout';
import NewAccount from './routes/account/AccountNew';
import ForgotPasswordPage from './routes/auth/ForgotPassword';
import ProtectedRoute from './routes/ProtectedRoute';
import AccountEdit from './routes/account/AccountEdit';
import { AuthProvider } from './component/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/accounts',
    element: <AccountsOverview />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/accounts/:accountId',
        element: <AccountDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/accounts/:accountId/edit',
        errorElement: <ErrorPage />,
        element: <AccountEdit />,
      },
      {
        path: '/accounts/new',
        errorElement: <ErrorPage />,
        element: <NewAccount />,
      },
    ],
  },
  {
    path: '/login',
    errorElement: <ErrorPage />,
    element: <SignIn />,
  },
  {
    path: '/register',
    errorElement: <ErrorPage />,
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    errorElement: <ErrorPage />,
    element: <ForgotPasswordPage />,
  },
  {
    path: '/logout',
    errorElement: <ErrorPage />,
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
