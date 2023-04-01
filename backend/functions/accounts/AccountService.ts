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
    let request = pool.request();
    request.input("UserGuid", sql.VarChar, CurrentUserGuid);
    let result = await request.query<Account>(
      `Select * from [dbo].[Account] WHERE UserGuid = @UserGuid`
    );

    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};
