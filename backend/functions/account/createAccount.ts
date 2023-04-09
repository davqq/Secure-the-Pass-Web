import sql, { config } from "mssql";
import { Account } from "./getAccounts";
import { User } from "../user/createUser";
import { handleError } from "../handleError";
import { Response } from "express";
import handleSuccess from "../handleSuccess";
import cryptr from "cryptr";

const createAccount = async ({
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
    let cryptor = new cryptr(process.env.SECRET as string);
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Username", sql.VarChar, account.Username);
    request.input("Email", sql.VarChar, account.Email);
    request.input("Password", sql.VarChar, cryptor.encrypt(account.Password));
    request.input("Website", sql.VarChar, account.Website);
    request.input("UserGuid", sql.VarChar, user.Guid);
    await request.query(
      `INSERT INTO [dbo].[Account] (Guid, Username, Email, Password, Website, UserGuid) VALUES (NEWID(), @Username, @Email, @Password, @Website, @UserGuid)`
    );
    handleSuccess({ success: "Account created successfully" }, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default createAccount;
