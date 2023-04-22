import getuser from "../user/checkEmail";
import { BadRequest } from "http-errors";
import { User } from "../user/createUser";
import jwt from "jsonwebtoken";
import { config } from "mssql";
import handleSuccess from "../handleSuccess";
import { handleError } from "../handleError";
import { Response } from "express";

const login = async ({
  user,
  config,
  res,
}: {
  user: User;
  config: config;
  res: Response;
}) => {
  try {
    const result = await getuser({ config, user });

    if (!result) {
      throw new BadRequest("User Not found");
    }

    let token = jwt.sign(
      { Guid: result.Guid, Email: result.Email, Username: result.Username },
      process.env.JWT as string,
      {
        expiresIn: "15m",
      }
    );

    const bearerHeader = {
      Authorization: `Bearer ${token}`,
    };

    handleSuccess({ success: "Login successful" }, 200, res, bearerHeader);
  } catch (err) {
    handleError(err, res);
  }
};

export default login;
