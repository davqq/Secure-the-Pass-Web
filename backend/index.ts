import express from "express";
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

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

app.get("/test", (req, res) => {
  res.send(new Response("Test", { status: 403 }));
});

app.post("/login", async (req, res) => {
  let response = await login({ user: req.body as User, config });
  res.sendStatus(response?.status ?? 500);
  res.send(response?.body ?? "Error");
});

app.post("/register", async (req, res) => {
  res.send(await register({ user: req.body as User, config }));
});

app.post("/checktoken", authMiddleware, (req, res) => {
  res.send("Token is valid");
});

app.get("/getuser", authMiddleware, async (req: any, res) => {
  res.send(req.user as User);
});

app.delete("/deleteuser", authMiddleware, async (req: any, res) => {
  await deleteUser({ config, user: req.user as User });
});

app.put("/updateuser", authMiddleware, async (req: any, res) => {
  await updateUser({ config, user: req.user as User });
});

app.get("/getaccounts", authMiddleware, async (req: any, res) => {
  res.send(await getAccounts({ config, currentUser: req.user as User }));
});

app.get("/getaccount/:id", authMiddleware, async (req: any, res) => {
  res.send(
    await getAccount({
      config,
      user: req.user as User,
      accountGuid: req.params.id,
    })
  );
});

app.delete("/deleteaccount/:id", authMiddleware, async (req: any, res) => {
  await deleteAccount({
    config,
    user: req.user as User,
    accountGuid: req.params.id,
  });
});

app.put("/updateaccount/:id", authMiddleware, async (req: any, res) => {
  await updateAccount({
    config,
    user: req.user as User,
    account: req.body as Account,
  });
});

app.post("/createaccount", authMiddleware, async (req: any, res) => {
  await createAccount({
    config,
    user: req.user as User,
    account: req.body as Account,
  });
});
