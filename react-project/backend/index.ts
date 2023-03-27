import express from "express";
import { GetAccounts } from "./functions/accounts/AccountService";
import {
  CheckUser,
  User,
  RegisterUser,
  TestSqlConnect,
} from "./functions/user/UserService";
import { authenticateToken } from "./functions/authentication/AuthenticationService";

const app = express();
const port = 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/api/getaccounts", authenticateToken, (req, res) => {
  res.send(GetAccounts());
});

app.post("/api/login", (req, res) => {
  res.send(JSON.stringify({ token: CheckUser(req.body as User) }));
});

app.post("/api/register", (req, res) => {
  res.send(JSON.stringify({ token: RegisterUser(req.body as User) }));
});

app.post("/api/checktoken", authenticateToken, (req, res) => {
  res.send("Token is valid");
});

app.get("/api/testsql", (req, res) => {
  TestSqlConnect();
  res.send("Test");
});
