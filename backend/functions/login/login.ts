import getuser from "../user/getUser";
import { BadRequest } from "http-errors";
import { User } from "../user/createUser";
import jwt from "jsonwebtoken";
import { config } from "mssql";
import { handleSuccess } from "../handleSuccess";
import { handleError } from "../handleError";

const login = async ({ user, config }: { user: User; config: config }) => {
  try {
    const result = await getuser({ config, user });

    if (!result) {
      throw new BadRequest("User Not found");
    }

    let token = jwt.sign(result, process.env.SECRET as string, {
      expiresIn: "15m",
    });

    const bearerHeader = { Authorization: `Bearer ${token}` };

    return handleSuccess(
      { success: "Login successful", result },
      200,
      bearerHeader
    );
  } catch (err) {
    console.log(err);
    handleError(err);
  }
};

export default login;
