import sql, { config } from "mssql";
import { User } from "../user/createUser";
import { Response } from "express";
import { handleError } from "../handleError";
import handleSuccess from "../handleSuccess";

export interface Account {
  Guid: string;
  Username: string;
  Email: string;
  Password: string;
  Website: string;
  UserGuid: string;
}

const getAccounts = async ({
  config,
  currentUser,
  res,
}: {
  config: config;
  currentUser: User;
  res: Response;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("UserGuid", sql.VarChar, currentUser.Guid);
    let result = await request.query<Account>(
      `SELECT * FROM [dbo].[Account] WHERE UserGuid = @UserGuid`
    );
    handleSuccess(result.recordset, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default getAccounts;
