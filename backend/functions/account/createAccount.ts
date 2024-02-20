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
    let cryptor = new cryptr(process.env.ENCYPTION as string);
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Username", sql.VarChar, account.Username);
    request.input("Email", sql.VarChar, account.Email);
    request.input("Password", sql.VarChar, cryptor.encrypt(account.Password));
    request.input("Url", sql.VarChar, account.Url);
    request.input("UserGuid", sql.VarChar, user.Guid);
    request.input("UpdatedAt", sql.VarChar, new Date().toISOString());
    request.input("Favorite", sql.Bit, account.Favorite ?? false);
    request.input("Notes", sql.VarChar, account.Notes);
    request.input("CreatedAt", sql.VarChar, new Date().toISOString());
    await request.query<Account>(
      `INSERT INTO [dbo].[Account] (Guid, Username, Email, Password, Url, UserGuid, UpdatedAt, Favorite, Notes, CreatedAt) ` +
        `VALUES (NEWID(), @Username, @Email, @Password, @Url, @UserGuid, @UpdatedAt, @Favorite, @Notes, @CreatedAt)`
    );
    handleSuccess({ success: "Account created successfully" }, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default createAccount;
