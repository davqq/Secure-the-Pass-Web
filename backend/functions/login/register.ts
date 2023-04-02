import { config } from "mssql";
import adduser, { User } from "../user/adduser";
import getuser from "../user/getuser";
import { BadRequest } from "http-errors";
import jwt from "jsonwebtoken";

const register = async ({ user, config }: { user: User; config: config }) => {
  try {
    let result = getuser({ config, user });

    if (!!result) {
      throw new BadRequest("User already exists");
    }

    adduser({ config, user });

    let token = jwt.sign(user, process.env.SECRET as string, {
      expiresIn: "15m",
    });

    return `Bearer ${token}`;
  } catch (err) {
    console.log(err);
  }
};

export default register;
