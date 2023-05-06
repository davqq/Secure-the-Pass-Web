import sql, { config } from "mssql";
import { User } from "../user/createUser";
import { Account } from "./getAccounts";
import { handleError } from "../handleError";
import { Response } from "express";
import handleSuccess from "../handleSuccess";
import { BadRequest } from "http-errors";
import cryptr from "cryptr";

const getAccount = async ({
  config,
  accountGuid,
  res,
}: {
  config: config;
  accountGuid: string;
  res: Response;
}) => {
  try {
    const cryptor = new cryptr(process.env.ENCYPTION as string);
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, accountGuid);
    let result = await request.query<Account>(
      `SELECT * FROM [dbo].[Account] WHERE Guid = @Guid`
    );

    if (!result.recordsets || result.recordset.length === 0) {
      throw new BadRequest("Account not found");
    }

    const account = result.recordset[0];

    account.Password = cryptor.decrypt(account.Password);

    handleSuccess(account, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default getAccount;
