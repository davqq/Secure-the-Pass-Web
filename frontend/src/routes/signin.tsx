import "./signin.css";
import env from "react-dotenv";

export default function SignIn() {
  addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      LogIn();
    }
  });

  return (
    <>
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
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="Password"
            />
            <input
              type="button"
              className="fadeIn fourth"
              value="Log In"
              onClick={LogIn}
            />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="/forgotpassword">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function LogIn() {
  const email: string = (document.getElementById("email") as HTMLInputElement)
    .value;
  const password: string = (
    document.getElementById("password") as HTMLInputElement
  ).value;
  fetch(`${env.API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email, Password: password }),
  }).then((res) => {
    const token = res.headers.get("Authorization");
    if (token) {
      document.cookie = token;
      window.location.replace("/");
    }
  });
}
