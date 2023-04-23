import sql, { config } from "mssql";
import { User } from "./createUser";
import bcrypt from "bcryptjs";

const checkUser = async ({ config, user }: { config: config; user: User }) => {
  let pool = await sql.connect(config);
  let request = pool.request();
  request.input("Email", sql.VarChar, user.Email);
  let result = await request.query<User>(
    `SELECT * FROM [dbo].[User] WHERE Email = @Email`
  );
  const userDatabase = result.recordset[0];
  if (userDatabase) {
    const passwordMatch = await bcrypt.compare(
      user.Password,
      userDatabase.Password
    );
    if (passwordMatch) {
      return userDatabase;
    }
  }
  return null;
};

export default checkUser;
