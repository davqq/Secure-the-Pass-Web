import { useEffect, useState } from "react";
import "./signin.css";
import env from "react-dotenv";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      Register(email, username, password, passwordConfirm);
    }
  });
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="tabs">
          <h2 className="inactive underlineHover" id="SignIn">
            <a href="/login">Log In</a>
          </h2>
          <h2 className="active" id="SignUp">
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
            type="text"
            id="username"
            className="fadeIn second"
            name="login"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
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
            type="password"
            id="passwordConfirm"
            className="fadeIn third"
            name="login"
            placeholder="Password Confirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <input
            type="button"
            className="fadeIn fourth"
            value="Register"
            onClick={() => Register(email, username, password, passwordConfirm)}
          />
        </form>
      </div>
    </div>
  );
}

function Register(
  email: string,
  username: string,
  password: string,
  passwordConfirm: string
) {
  if (password !== passwordConfirm) {
    alert("Passwords do not match");
    return;
  }

  fetch(`${env.API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: email,
      Username: username,
      Password: password,
    }),
  }).then((res) => {
    const token = res.headers.get("Authorization");
    console.log(token);
    if (token) {
      document.cookie = `jwt=${token};`;
      window.location.replace("/");
    }
  });
}
