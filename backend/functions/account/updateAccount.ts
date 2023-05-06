import sql, { config } from "mssql";
import { Account } from "./getAccounts";
import handleSuccess from "../handleSuccess";
import { handleError } from "../handleError";
import { Response } from "express";
import cryptr from "cryptr";

const updateAccount = async ({
  config,
  account,
  res,
}: {
  config: config;
  account: Account;
  res: Response;
}) => {
  try {
    let cryptor = new cryptr(process.env.ENCYPTION as string);
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, account.Guid);
    request.input("Username", sql.VarChar, account.Username);
    request.input("Email", sql.VarChar, account.Email);
    request.input("Password", sql.VarChar, cryptor.encrypt(account.Password));
    request.input("Url", sql.VarChar, account.Url);
    request.input("UpdatedAt", sql.VarChar, new Date().toISOString());
    request.input("Favorite", sql.Int, account.favorite);
    request.input("Notes", sql.VarChar, account.Notes);
    request.input("UrlName", sql.VarChar, account.urlName);
    await request.query(
      `UPDATE [dbo].[Account] SET Username = @Username, Email = @Email, Password = @Password, UpdateAt = @UpdateAt, Favorite = @Favorite, Url = @Url, UrlName = @UrlName, Notes = @Notes` +
        `WHERE Guid = @Guid`
    );
    handleSuccess({ success: "Account updated successfully" }, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default updateAccount;
