import { config } from "mssql";
import createUser, { User } from "../user/createUser";
import getuser from "../user/getUser";
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
    const result = await getuser({ config, user });

    if (result) {
      throw new BadRequest("User already exists");
    }

    await createUser({ config, user });

    let token = jwt.sign(user, process.env.SECRET as string, {
      expiresIn: "15m",
    });
    const bearerHeader = { Authorization: `Bearer ${token}` };

    handleSuccess({ success: "Register successful" }, 200, res, bearerHeader);
  } catch (err) {
    console.log(err);
    handleError(err, res);
  }
};

export default register;
