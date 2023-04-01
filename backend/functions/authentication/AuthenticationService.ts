import jwt from "jsonwebtoken";
import crypto from "crypto";

let tokenSecret: string = crypto.randomBytes(64).toString("hex");

export function generateAccessToken(user: object) {
  return jwt.sign(user, tokenSecret, {
    expiresIn: "15m",
  });
}

export function authenticateToken(req: any, res: any, next: any) {
  const token: string = req.headers["authorization"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, tokenSecret, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
