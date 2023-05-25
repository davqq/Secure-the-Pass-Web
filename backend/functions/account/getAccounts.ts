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
  Url: string;
  UserGuid: string;
  Notes: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  UrlName: string;
  Favorite: boolean;
}

export interface AccountSmall {
  Guid: string;
  Username: string;
  Url: string;
  UrlName: string;
  Favorite: boolean;
  UpdatedAt: Date;
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
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("UserGuid", sql.VarChar, currentUser.Guid);
    let result = await request.query<AccountSmall>(
      `SELECT Guid, Username, Url, UrlName, Favorite, CONVERT(VARCHAR(10), UpdatedAt, 120) FROM [dbo].[Account] WHERE UserGuid = @UserGuid ORDER BY UpdatedAt DESC`
    );

    let accounts =
      (search &&
        result.recordset.filter((account) => {
          return (
            account.Url.toLowerCase().includes(search.toLowerCase()) ||
            account.Username.toLowerCase().includes(search.toLowerCase())
          );
        })) ||
      result.recordset;

    handleSuccess(accounts, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default getAccounts;
