import sql, { config } from "mssql";
import { User } from "../user/adduser";

export interface Account {
  Guid: string;
  Username: string;
  Email: string;
  Password: string;
  Website: string;
  UserGuid: string;
}

const GetAccounts = async ({
  config,
  currentUser,
}: {
  config: config;
  currentUser: User;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("UserGuid", sql.VarChar, currentUser.Guid);
    let result = await request.query<Account>(
      `Select * from [dbo].[Account] WHERE UserGuid = @UserGuid`
    );

    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

export default GetAccounts;
