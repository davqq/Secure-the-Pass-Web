import express, { Response, NextFunction } from "express";
import register from "./functions/login/register";
import env from "dotenv";
import { config } from "mssql";
import jwt from "jsonwebtoken";
import login from "./functions/login/login";
import { User } from "./functions/user/createUser";
import deleteUser from "./functions/user/deleteUser";
import updateUser from "./functions/user/updateUser";
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
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionsSuccessStatus: 200,
  preflightContinue: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

app.post("/login", async (req, res) => {
  await login({ user: req.body as User, config, res });
});

app.post("/register", async (req, res) => {
  await register({ user: req.body as User, config, res });
});

app.post("/checktoken", authMiddleware, (req, res) => {
  res.send("Token is valid");
});

app.get("/getuser", authMiddleware, async (req: any, res) => {
  res.send(req.user as User);
});

app.delete("/deleteuser", authMiddleware, async (req: any, res) => {
  await deleteUser({ config, user: req.user as User, res });
});

app.put("/updateuser", authMiddleware, async (req, res) => {
  await updateUser({ config, user: req.body as User, res });
});

app.get("/getaccounts", authMiddleware, async (req: any, res) => {
  await getAccounts({ config, currentUser: req.user as User, res });
});

app.get("/getaccount/:id", authMiddleware, async (req: any, res) => {
  await getAccount({
    config,
    user: req.user as User,
    accountGuid: req.params.id,
    res,
  });
});

app.post("/createaccount", authMiddleware, async (req: any, res) => {
  await createAccount({
    config,
    user: req.user as User,
    account: req.body as Account,
    res,
  });
});

app.delete("/deleteaccount/:id", authMiddleware, async (req: any, res) => {
  await deleteAccount({
    config,
    user: req.user as User,
    accountGuid: req.params.id,
    res,
  });
});

app.put("/updateaccount", authMiddleware, async (req: any, res) => {
  const account = req.body as Account;
  account.UserGuid = (req.user as User).Guid;
  await updateAccount({
    config,
    account: account,
    res,
  });
});
app.get("/generatepassword", (req, res) => {
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  res.send({ password: password });
});
