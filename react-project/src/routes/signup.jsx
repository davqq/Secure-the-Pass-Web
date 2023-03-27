import "./signin.css";

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
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  if (password !== passwordConfirm) {
    alert("Passwords do not match");
    return;
  }

  fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.token) {
        localStorage.setItem("token", result.token);
        window.location.replace("/dashboard");
      }
    });
}
