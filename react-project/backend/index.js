"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AccountService_1 = require("./functions/accounts/AccountService");
const UserService_1 = require("./functions/user/UserService");
const AuthenticationService_1 = require("./functions/authentication/AuthenticationService");
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.get("/api/getaccounts", AuthenticationService_1.authenticateToken, (req, res) => {
    res.send((0, AccountService_1.GetAccounts)());
});
app.post("/api/login", (req, res) => {
    res.send(JSON.stringify({ token: (0, UserService_1.CheckUser)(req.body) }));
});
app.post("/api/register", (req, res) => {
    res.send(JSON.stringify({ token: (0, UserService_1.RegisterUser)(req.body) }));
});
app.post("/api/checktoken", AuthenticationService_1.authenticateToken, (req, res) => {
    res.send("Token is valid");
});
app.get("/api/testsql", (req, res) => {
    (0, UserService_1.TestSqlConnect)();
    res.send("Test");
});
