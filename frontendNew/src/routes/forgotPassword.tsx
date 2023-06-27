import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = () => {
    // Hier kannst du die Logik zum Zurücksetzen des Passworts implementieren
    // Beispiel: API-Aufruf zum Senden einer E-Mail zum Zurücksetzen des Passworts

    // Hier setzen wir die Variable "emailSent" auf true, um anzuzeigen, dass die E-Mail gesendet wurde
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 w-full">
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <a
          href="/"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
        >
          {"<-"}
        </a>
      </div>
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center justify-start">
          <img
            className="mx-auto h-12 w-auto"
            src="../src/assets/logo.svg"
            alt="Logo"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Forgot Password
        </h2>
        <div className="mt-8 py-8 px-4 sm:rounded-lg sm:px-10">
          {emailSent ? (
            <div>
              <p className="text-lg text-white">
                An email with instructions to reset your password has been sent
                to your email address.
              </p>
              <p className="mt-2 text-sm text-gray-300">
                Please check your email and follow the instructions to reset
                your password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
