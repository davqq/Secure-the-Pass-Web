import sql, { config } from "mssql";
import { User } from "../user/createUser";
import { Account } from "./getAccounts";
import { handleError } from "../handleError";
import { Response } from "express";
import handleSuccess from "../handleSuccess";
import { BadRequest } from "http-errors";

const getAccount = async ({
  config,
  user,
  accountGuid,
  res,
}: {
  config: config;
  user: User;
  accountGuid: string;
  res: Response;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, accountGuid);
    request.input("UserGuid", sql.VarChar, user.Guid);
    let result = await request.query<Account>(
      `SELECT * FROM [dbo].[Account] WHERE Guid = @Guid AND UserGuid = @UserGuid`
    );

    if (!result.recordsets || result.recordset.length === 0) {
      throw new BadRequest("Account not found");
    }

    handleSuccess(result.recordset[0], 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default getAccount;
