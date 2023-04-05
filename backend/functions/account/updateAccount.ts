import sql, { config } from "mssql";
import { User } from "../user/createUser";
import { Account } from "./getAccounts";
import bcrypt from "bcryptjs";
import handleSuccess from "../handleSuccess";
import { handleError } from "../handleError";
import { Response } from "express";

const updateAccount = async ({
  config,
  user,
  account,
  res,
}: {
  config: config;
  user: User;
  account: Account;
  res: Response;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, account.Guid);
    request.input("Username", sql.VarChar, account.Username);
    request.input("Email", sql.VarChar, account.Email);
    request.input(
      "Password",
      sql.VarChar,
      bcrypt.hashSync(account.Password, bcrypt.genSaltSync())
    );
    request.input("Website", sql.VarChar, account.Website);
    request.input("UserGuid", sql.VarChar, user.Guid);
    await request.query(
      `UPDATE [dbo].[Account] SET Username = @Username, Email = @Email, Password = @Password, Website = @Website, UserGuid = @UserGuid WHERE Guid = @Guid`
    );
    handleSuccess({ success: "User deleted successfully" }, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default updateAccount;
