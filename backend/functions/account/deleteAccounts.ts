import sql, { config } from "mssql";
import { User } from "../user/createUser";

const deleteAccount = async ({
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
    await request.query(
      `DELETE FROM [dbo].[Account] WHERE Guid = @Guid AND UserGuid = @UserGuid`
    );
  } catch (err) {
    console.log(err);
  }
};

export default deleteAccount;
