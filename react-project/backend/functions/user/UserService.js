"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = exports.CheckUser = exports.TestSqlConnect = void 0;
const AuthenticationService_1 = require("../authentication/AuthenticationService");
const mssql_1 = __importDefault(require("mssql"));
const users = [
    {
        email: "test@test.com",
        username: "test",
        password: "123",
    },
];
const config = {
    user: "sa",
    password: "0000",
    server: "localhost",
    database: "Test",
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};
const TestSqlConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect("Server=localhost;Database=master;Trusted_Connection=True;");
        let result = yield pool.request().query("select * from [dbo].[User]");
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
});
exports.TestSqlConnect = TestSqlConnect;
function CheckUser(user) {
    const userFound = users.find((u) => u.email === user.email && u.password === user.password);
    if (!userFound) {
        return null;
    }
    return (0, AuthenticationService_1.generateAccessToken)(userFound);
}
exports.CheckUser = CheckUser;
function RegisterUser(user) {
    if (users.find((u) => u.email === user.email)) {
        return null;
    }
    users.push(user);
    return (0, AuthenticationService_1.generateAccessToken)(user);
}
exports.RegisterUser = RegisterUser;
