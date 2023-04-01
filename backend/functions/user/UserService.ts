import { generateAccessToken } from "../authentication/AuthenticationService";
import { Account } from "../accounts/AccountService";
import sql, { config } from "mssql";

export let CurrentUserGuid: string;

export interface User {
  Guid: string;
  email: string;
  username: string;
  password: string;
}

export const CheckUser = async (user: User, config: config) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Email", sql.VarChar, user.email);
    request.input("Password", sql.VarChar, user.password);
    let result = await request.query<User>(
      `Select * from [dbo].[User] WHERE Email = @Email AND Password = @Password`
    );

    if (!result || !result.recordset || result.recordset.length > 0) {
      throw new Response("", { status: 404, statusText: "User Not found" });
    }

    let userFound = result.recordset[0];

    CurrentUserGuid = userFound.Guid;

    return { token: generateAccessToken(userFound) };
  } catch (err) {
    console.log(err);
  }
};

export const RegisterUser = async (user: User, config: config) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Email", sql.VarChar, user.email);
    request.input("Password", sql.VarChar, user.password);
    let result = await request.query<Account>(
      `Select * from [dbo].[User] WHERE Email = @Email AND Password = @Password`
    );

    if (result && result.recordset && result.recordset.length > 0) {
      throw new Response("", { status: 403, statusText: "User exist" });
    }

    request = pool.request();
    request.input("Email", sql.VarChar, user.email);
    request.input("Password", sql.VarChar, user.password);
    request.input("Username", sql.VarChar, user.username);

    request.query(
      `INSERT INTO [dbo].[User] (Guid, Email, Username, Password) VALUES (NEWID(), @Email, @Username, @Password)`
    );
    return { token: generateAccessToken(user) };
  } catch (err) {
    console.log(err);
  }
};
