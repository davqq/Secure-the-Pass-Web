import sql, { config } from "mssql";
import { User } from "../user/adduser";
import { Account } from "./getaccounts";

const updateaccount = async ({
  config,
  user,
  account,
}: {
  config: config;
  user: User;
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
    request.input("UserGuid", sql.VarChar, user.Guid);
    request.query(
      `UPDATE [dbo].[Account] SET Username = @Username, Email = @Email, Password = @Password, Website = @Website, UserGuid = @UserGuid WHERE Guid = @Guid`
    );
  } catch (err) {
    console.log(err);
  }
};

export default updateaccount;
