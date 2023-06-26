import React, { useEffect, useState } from "react";
import env from "react-dotenv";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleLogin = () => {
    fetch(`${env.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email, Password: password }),
    })
      .then((res) => {
        const token = res.headers.get("Authorization");
        if (token) {
          document.cookie = `jwt=${token};`;
          window.location.replace("/");
        } else if (!document.cookie.includes("jwt")) {
          setErrorText("Invalid email or password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 w-full">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto text-white"
            src="../src/assets/logo.svg"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 py-8 px-4 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
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

            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errorText ? "border-red-500" : "border-gray-700"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700 !important`}
                  placeholder="Enter your password"
                />
              </div>
              {errorText && (
                <p className="mt-2 text-sm text-red-500">{errorText}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
