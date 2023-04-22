import { useState } from "react";
import "./signin.css";
import env from "react-dotenv";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      LogIn(email, password);
    }
  });

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="tabs">
          <h2 className="active" id="SignIn">
            <a href="/login">Log In</a>
          </h2>
          <h2 className="inactive underlineHover" id="SignUp">
            <a href="/register">Register</a>
          </h2>
        </div>

        <form>
          <input
            type="text"
            id="email"
            className="fadeIn second"
            name="login"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="button"
            className="fadeIn fourth"
            value="Log In"
            onClick={() => LogIn(email, password)}
          />
        </form>

        <div id="formFooter">
          <a className="underlineHover" href="/forgotpassword">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

function LogIn(email: string, password: string) {
  fetch(`${env.API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email, Password: password }),
  }).then((res) => {
    const token = res.headers.get("Authorization");
    if (token) {
      document.cookie = `jwt=${token};`;
      window.location.replace("/");
    }
  });
}
