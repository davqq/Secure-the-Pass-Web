import sql, { config } from "mssql";
import { User } from "./createUser";

const getUser = async ({ config, user }: { config: config; user: User }) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Email", sql.VarChar, user.email);
    request.input("Password", sql.VarChar, user.password);
    let result = await request.query<User>(
      `SELECT * FROM [dbo].[User] WHERE Email = @Email AND Password = @Password`
    );
    return result.recordset[0];
  } catch (err) {
    console.log(err);
  }
};

export default getUser;
