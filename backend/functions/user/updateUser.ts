import sql, { config } from "mssql";
import { User } from "./createUser";
import bcrypt from "bcryptjs";
import handleSuccess from "../handleSuccess";
import { handleError } from "../handleError";
import { Response } from "express";

const updateUser = async ({
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
    request.input("Email", sql.VarChar, user.Email);
    request.input(
      "Password",
      sql.VarChar,
      bcrypt.hashSync(user.Password, bcrypt.genSaltSync())
    );
    request.input("Username", sql.VarChar, user.Username);
    request.input("Guid", sql.VarChar, user.Guid);

    console.log(user);
    await request.query(
      `UPDATE [dbo].[User] SET Username = @Username, Email = @Email, Password = @Password WHERE Guid = @Guid`
    );
    handleSuccess({ success: "User updated successfully" }, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default updateUser;
