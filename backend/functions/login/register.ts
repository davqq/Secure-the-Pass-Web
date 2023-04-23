import { config } from "mssql";
import createUser, { User } from "../user/createUser";
import checkEmail from "../user/checkEmail";
import { BadRequest } from "http-errors";
import jwt from "jsonwebtoken";
import { Response } from "express";
import handleSuccess from "../handleSuccess";
import { handleError } from "../handleError";

const register = async ({
  user,
  config,
  res,
}: {
  user: User;
  config: config;
  res: Response;
}) => {
  try {
    if (!user.Email || !user.Password || !user.Username) {
      throw new BadRequest("Missing fields");
    }

    const result = await checkEmail({ config, user });

    if (result) {
      throw new BadRequest("Email already exists");
    }

    user = await createUser({ config, user });

    let token = jwt.sign(
      { Guid: user.Guid, Email: user.Email, Username: user.Username },
      process.env.JWT as string,
      {
        expiresIn: "15m",
      }
    );
    const bearerHeader = { Authorization: `Bearer ${token}` };

    handleSuccess({ success: "Register successful" }, 200, res, bearerHeader);
  } catch (err) {
    handleError(err, res);
  }
};

export default register;
