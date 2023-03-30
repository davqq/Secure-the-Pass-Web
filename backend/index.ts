import express from "express";
import { GetAccounts } from "./functions/accounts/AccountService";
import { CheckUser, User, RegisterUser } from "./functions/user/UserService";
import { authenticateToken } from "./functions/authentication/AuthenticationService";
import env from "dotenv";
import { config } from "mssql";

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
const port = 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/api/getaccounts", authenticateToken, async (req, res) => {
  res.send(await GetAccounts(config));
});

app.post("/api/login", async (req, res) => {
  res.send(await CheckUser(req.body as User, config));
});

app.post("/api/register", async (req, res) => {
  res.send(await RegisterUser(req.body as User, config));
});

app.post("/api/checktoken", authenticateToken, (req, res) => {
  res.send("Token is valid");
});
