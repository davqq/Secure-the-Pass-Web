import { useEffect, useState } from "react";
import "./signin.css";
import env from "react-dotenv";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [helpTextEmail, setHelpTextEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [helpTextUsername, setHelpTextUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [helpTextPassword, setHelpTextPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [helpTextPasswordConfirm, setHelpTextPasswordConfirm] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(false);
  addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      Register(
        email,
        username,
        password,
        passwordConfirm,
        setErrorEmail,
        setHelpTextEmail,
        setErrorUsername,
        setHelpTextUsername,
        setErrorPassword,
        setHelpTextPassword,
        setErrorPasswordConfirm,
        setHelpTextPasswordConfirm
      );
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
            type="Email"
            id="email"
            className="fadeIn second"
            name="login"
            // label="Email"
            // error={errorEmail}
            // helperText={helpTextEmail}
            style={{ width: "80%" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorEmail(false);
              setHelpTextEmail("");
            }}
          />

          <input
            type="Username"
            id="username"
            className="fadeIn second"
            // error={errorUsername}
            // helperText={helpTextUsername}
            style={{ width: "80%", marginTop: "10px" }}
            name="login"
            // label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorUsername(false);
              setHelpTextUsername("");
            }}
          />

          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            // error={errorPassword}
            // helperText={helpTextPassword}
            style={{ width: "80%", marginTop: "10px" }}
            // label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorPassword(false);
              setHelpTextPassword("");
            }}
          />

          <input
            type="password"
            id="passwordConfirm"
            className="fadeIn third"
            // error={errorPasswordConfirm}
            // helperText={helpTextPasswordConfirm}
            style={{ width: "80%", marginTop: "10px", marginBottom: "10px" }}
            name="login"
            // label="Password Confirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setErrorPasswordConfirm(false);
              setHelpTextPasswordConfirm("");
            }}
          />
          <input
            type="button"
            className="fadeIn fourth"
            value="Register"
            onClick={() =>
              Register(
                email,
                username,
                password,
                passwordConfirm,
                setErrorEmail,
                setHelpTextEmail,
                setErrorUsername,
                setHelpTextUsername,
                setErrorPassword,
                setHelpTextPassword,
                setErrorPasswordConfirm,
                setHelpTextPasswordConfirm
              )
            }
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
  passwordConfirm: string,
  setErrorEmail: React.Dispatch<React.SetStateAction<boolean>>,
  setHelpTextEmail: React.Dispatch<React.SetStateAction<string>>,
  setErrorUsername: React.Dispatch<React.SetStateAction<boolean>>,
  setHelpTextUsername: React.Dispatch<React.SetStateAction<string>>,
  setErrorPassword: React.Dispatch<React.SetStateAction<boolean>>,
  setHelpTextPassword: React.Dispatch<React.SetStateAction<string>>,
  setErrorPasswordConfirm: React.Dispatch<React.SetStateAction<boolean>>,
  setHelpTextPasswordConfirm: React.Dispatch<React.SetStateAction<string>>
) {
  if (
    email === "" ||
    username === "" ||
    password === "" ||
    passwordConfirm === ""
  ) {
    if (email === "") {
      setErrorEmail(true);
      setHelpTextEmail("Email cannot be empty");
    }
    if (username === "") {
      setErrorUsername(true);
      setHelpTextUsername("Username cannot be empty");
    }
    if (password === "") {
      setErrorPassword(true);
      setHelpTextPassword("Password cannot be empty");
    }
    if (passwordConfirm === "") {
      setErrorPasswordConfirm(true);
      setHelpTextPasswordConfirm("Password cannot be empty");
    }
    return;
  }

  if (password !== passwordConfirm) {
    setErrorPassword(true);
    setHelpTextPassword("Passwords do not match");
    setErrorPasswordConfirm(true);
    setHelpTextPasswordConfirm("Passwords do not match");
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
  })
    .then((res) => {
      const token = res.headers.get("Authorization");
      if (token) {
        document.cookie = `jwt=${token};`;
        window.location.replace("/");
      } else if (res.status === 400) {
        res.json().then((data) => {
          setErrorEmail(true);
          setHelpTextEmail(data.error);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
