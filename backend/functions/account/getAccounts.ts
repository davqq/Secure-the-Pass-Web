import sql, { config } from "mssql";
import { User } from "../user/createUser";
import { Response } from "express";
import { handleError } from "../handleError";
import handleSuccess from "../handleSuccess";
import encrypt from "cryptr";

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
  search,
}: {
  config: config;
  currentUser: User;
  res: Response;
  search?: string;
}) => {
  try {
    let cryptor = new encrypt(process.env.ENCYPTION as string);
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("UserGuid", sql.VarChar, currentUser.Guid);
    let result = await request.query<Account>(
      `SELECT * FROM [dbo].[Account] WHERE UserGuid = @UserGuid Order By Website`
    );

    let accounts = result.recordset.filter((account) => {
      if (search) {
        return (
          account.Website.toLowerCase().includes(search.toLowerCase()) ||
          account.Username.toLowerCase().includes(search.toLowerCase()) ||
          account.Email.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return true;
      }
    });

    accounts.forEach((account) => {
      account.Password = cryptor.decrypt(account.Password);
    });

    handleSuccess(accounts, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default getAccounts;
