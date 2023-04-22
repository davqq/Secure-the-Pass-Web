import sql, { config } from "mssql";
import { User } from "./createUser";

const checkEmail = async ({ config, user }: { config: config; user: User }) => {
  let pool = await sql.connect(config);
  let request = pool.request();
  request.input("Email", sql.VarChar, user.Email);
  let result = await request.query<User>(
    `SELECT * FROM [dbo].[User] WHERE Email = @Email`
  );
  return  result.recordset[0];
};

export default checkEmail;
