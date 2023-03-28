import jwt from "jsonwebtoken";
import crypto from "crypto";

process.env.TOKEN_SECRET = crypto.randomBytes(64).toString("hex");

export function generateAccessToken(user: object) {
  return jwt.sign(user, process.env.TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
}

export function authenticateToken(req: any, res: any, next: any) {
  const token = req.headers["authorization"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
