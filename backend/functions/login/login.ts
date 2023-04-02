import getuser from "../user/getUser";
import { BadRequest } from "http-errors";
import { User } from "../user/createUser";
import jwt from "jsonwebtoken";
import { config } from "mssql";

const login = async ({ user, config }: { user: User; config: config }) => {
  try {
    const result = await getuser({ config, user });

    if (!result) {
      throw new BadRequest("User Not found");
    }

    let token = jwt.sign(user, process.env.SECRET as string, {
      expiresIn: "15m",
    });

    return `Bearer ${token}`;
  } catch (err) {
    console.log(err);
  }
};

export default login;
