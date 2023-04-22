import "./signin.css";
import env from "react-dotenv";

export default function SignUp() {
  return (
    <>
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
            />

            <input
              type="text"
              id="username"
              className="fadeIn second"
              name="login"
              placeholder="Username"
            />

            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="Password"
            />

            <input
              type="password"
              id="passwordConfirm"
              className="fadeIn third"
              name="login"
              placeholder="Password Confirm"
            />
            <input
              type="button"
              className="fadeIn fourth"
              value="Register"
              onClick={Register}
            />
          </form>
        </div>
      </div>
    </>
  );
}

function Register() {
  const email: string = (document.getElementById("email") as HTMLInputElement)
    .value;
  const username: string = (
    document.getElementById("username") as HTMLInputElement
  ).value;
  const password: string = (
    document.getElementById("password") as HTMLInputElement
  ).value;
  const passwordConfirm: string = (
    document.getElementById("passwordConfirm") as HTMLInputElement
  ).value;

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
    if (token) {
      document.cookie = `jwt=${token};`;
      window.location.replace("/");
    }
  });
}
