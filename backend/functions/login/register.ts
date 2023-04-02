import { config } from "mssql";
import adduser, { User } from "../user/createUser";
import getuser from "../user/getUser";
import { BadRequest } from "http-errors";
import jwt from "jsonwebtoken";

const register = async ({ user, config }: { user: User; config: config }) => {
  try {
    const result = await getuser({ config, user });

    if (result) {
      throw new BadRequest("User already exists");
    }

    await adduser({ config, user });

    let token = jwt.sign(user, process.env.SECRET as string, {
      expiresIn: "15m",
    });

    return `Bearer ${token}`;
  } catch (err) {
    console.log(err);
  }
};

export default register;
