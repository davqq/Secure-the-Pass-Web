import express, { Response, NextFunction, json } from "express";
import register from "./functions/login/register";
import env from "dotenv";
import { config } from "mssql";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import login from "./functions/login/login";
import { User } from "./functions/user/createUser";
import getAccounts, { Account } from "./functions/account/getAccounts";
import getAccount from "./functions/account/getAccount";
import deleteAccount from "./functions/account/deleteAccounts";
import updateAccount from "./functions/account/updateAccount";
import createAccount from "./functions/account/createAccount";
import cors from "cors";
import generator from "generate-password-ts";

env.config();

const config: config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST as string,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustedConnection: true,
  },
  parseJSON: true,
};

const app = express();
const port = process.env.PORT;

const corsOptions: cors.CorsOptions = {
  origin: (process.env.Origin as string).split(","),
  credentials: true,
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.session; // JWT aus Cookie holen

  if (!token) {
    return res.status(401).json({ message: "Not authorised" });
  }

  jwt.verify(token, process.env.JWT as string, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Token expired" });
    }

    req.user = user; // Benutzerinfos speichern
    next();
  });
};

app.post("/login", async (req, res) => {
  await login({ user: req.body as User, config, res });
});

app.post("/logout", async (req, res) => {
  res.clearCookie("session", { path: "/" });
  res.status(200).json({ message: "Erfolgreich ausgeloggt" });
});

app.post("/register", async (req, res) => {
  await register({ user: req.body as User, config, res });
});

app.get("/auth/check-session", authMiddleware, (req, res) => {
  res.send("Token is valid");
});

// app.get("/user", authMiddleware, async (req: any, res) => {
//   res.send(req.user as User);
// });

// app.delete("/user", authMiddleware, async (req: any, res) => {
//   await deleteUser({ config, user: req.user as User, res });
// });

// app.put("/user", authMiddleware, async (req, res) => {
//   await updateUser({ config, user: req.body as User, res });
// });

app.get("/accounts", authMiddleware, async (req: any, res) => {
  await getAccounts({
    config,
    currentUser: req.user as User,
    res,
    search: req.query.q,
  });
});

app.get("/accounts/:guid", authMiddleware, async (req, res) => {
  await getAccount({
    config,
    accountGuid: req.params.guid,
    res,
  });
});

app.post("/accounts", authMiddleware, async (req: any, res) => {
  await createAccount({
    config,
    user: req.user as User,
    account: req.body as Account,
    res,
  });
});

app.delete("/accounts", authMiddleware, async (req: any, res) => {
  const account = req.body as Account;
  await deleteAccount({
    config,
    accountGuid: account.Guid,
    res,
  });
});

app.put("/accounts", authMiddleware, async (req: any, res) => {
  const account = req.body as Account;
  account.UserGuid = (req.user as User).Guid;
  await updateAccount({
    config,
    account: account,
    res,
  });
});

app.get("/generatepassword", authMiddleware, (req, res) => {
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  res.send({ password: password });
});
