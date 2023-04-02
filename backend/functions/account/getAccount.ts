import sql, { config } from "mssql";
import { User } from "../user/createUser";
import { Account } from "./getAccounts";

const getAccount = async ({
  config,
  user,
  accountGuid,
}: {
  config: config;
  user: User;
  accountGuid: string;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, accountGuid);
    request.input("UserGuid", sql.VarChar, user.Guid);
    let result = await request.query<Account>(
      `Select * from [dbo].[Account] WHERE Guid = @Guid AND UserGuid = @UserGuid`
    );

    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

export default getAccount;
