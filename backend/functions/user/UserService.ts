import { generateAccessToken } from "../authentication/AuthenticationService";
import { Account } from "../accounts/AccountService";
import sql, { config } from "mssql";

export let CurrentUserGuid:string;

export interface User {
  Guid: string;
  email: string;
  username: string;
  password: string;
}

export const CheckUser = async (user: User, config: config) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query<User>(
        `Select * from [dbo].[User] WHERE Email = '${user.email}' AND Password = '${user.password}'`
      );

    if (!result || !result.recordset) {
      throw new Response("", { status: 404, statusText: "User Not found" });
    }

    let userFound = result.recordset[0];

    if (!userFound) {
      throw new Response("", { status: 404, statusText: "User Not found" });
    }

    CurrentUserGuid = userFound.Guid;

    return { token: generateAccessToken(userFound) };
  } catch (err) {
    console.log(err);
  }
};

export const RegisterUser = async (user: User, config: config) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query<Account>(
        `Select * from [dbo].[User] WHERE Email = ${user.email} AND Password = ${user.password}`
      );

    if (result && result.recordset) {
      throw new Response("", { status: 403, statusText: "User exist" });
    }

    pool
      .request()
      .query(
        `INSERT INTO [dbo].[User] (Guid, Email, Username, Password) VALUES (${user.Guid}, ${user.email}, ${user.username}, ${user.password})`
      );
  } catch (err) {
    console.log(err);
  }

  return { token: generateAccessToken(user) };
};
