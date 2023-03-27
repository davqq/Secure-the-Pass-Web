"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
process.env.TOKEN_SECRET = crypto_1.default.randomBytes(64).toString("hex");
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "15m",
    });
}
exports.generateAccessToken = generateAccessToken;
function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
