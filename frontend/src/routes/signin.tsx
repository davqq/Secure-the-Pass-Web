import { useState } from "react";
import "./signin.css";
import env from "react-dotenv";
import { TextField } from "@mui/material";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [helpText, setHelpText] = useState("");
  const [error, setError] = useState(false);
  addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      LogIn(email, password, setError, setHelpText);
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
          <TextField
            id="email"
            className="fadeIn second"
            name="login"
            type="Email"
            style={{ width: "80%" }}
            label="Email"
            error={error}
            helperText={helpText}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
              setHelpText("");
            }}
          />
          <TextField
            id="password"
            className="fadeIn third"
            style={{ width: "80%", marginTop: "10px", marginBottom: "10px" }}
            name="login"
            type="Password"
            label="Password"
            error={error}
            helperText={helpText}
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
              setHelpText("");
            }}
          />
          <input
            type="button"
            className="fadeIn fourth"
            value="Log In"
            onClick={() => LogIn(email, password, setError, setHelpText)}
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

function LogIn(
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  setHelpText: React.Dispatch<React.SetStateAction<string>>
) {
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
    } else {
      setError(true);
      setHelpText("Invalid email or password");
    }
  });
}
