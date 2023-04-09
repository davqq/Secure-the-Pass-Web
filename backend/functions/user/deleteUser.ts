import sql, { config } from "mssql";
import { User } from "./createUser";
import handleSuccess from "../handleSuccess";
import { Response } from "express";
import { handleError } from "../handleError";

const deleteUser = async ({
  config,
  user,
  res,
}: {
  config: config;
  user: User;
  res: Response;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, user.Guid);
    await request.query<User>(`DELETE [dbo].[User] WHERE Guid = @Guid`);
    handleSuccess({ success: "User deleted successfully" }, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default deleteUser;
