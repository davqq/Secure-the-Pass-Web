import sql, { config } from "mssql";
import { User } from "./createUser";
import bcrypt from "bcryptjs";

const getUser = async ({ config, user }: { config: config; user: User }) => {
  let pool = await sql.connect(config);
  let request = pool.request();
  request.input("Email", sql.VarChar, user.Email);
  let result = await request.query<User>(
    `SELECT * FROM [dbo].[User] WHERE Email = @Email`
  );
  let userfromDatabase =
    result.recordset.length > 0 && result.recordset && result.recordset[0];
  let passwordMatch =
    userfromDatabase &&
    (await bcrypt.compare(user.Password, userfromDatabase.Password));

  return passwordMatch ? userfromDatabase : null;
};

export default getUser;
