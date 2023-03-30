import sql, { config } from "mssql";
import { CurrentUserGuid } from "../user/UserService";

export interface Account {
  Guid: string;
  Username: string;
  Email: string;
  Password: string;
  Website: string;
  UserGuid: string;
}

export const GetAccounts = async (config: config) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query<Account>(
        `Select * from [dbo].[Account] WHERE UserGuid = '${CurrentUserGuid}'`
      );

    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};
