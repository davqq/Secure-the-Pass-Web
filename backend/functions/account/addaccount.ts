import sql, { config } from "mssql";
import { Account } from "./getaccounts";

const addaccount = async ({
  config,
  account,
}: {
  config: config;
  account: Account;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, account.Guid);
    request.input("Username", sql.VarChar, account.Username);
    request.input("Email", sql.VarChar, account.Email);
    request.input("Password", sql.VarChar, account.Password);
    request.input("Website", sql.VarChar, account.Website);
    request.input("UserGuid", sql.VarChar, account.UserGuid);
    request.query(
      `INSERT INTO [dbo].[Account] (Guid, Username, Email, Password, Website, UserGuid) VALUES (@Guid, @Username, @Email, @Password, @Website, @UserGuid)`
    );
  } catch (err) {
    console.log(err);
  }
};

export default addaccount;
