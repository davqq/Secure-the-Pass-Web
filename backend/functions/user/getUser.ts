import sql, { config } from "mssql";
import { User } from "./createUser";
import bcrypt from "bcryptjs";

const getUser = async ({ config, user }: { config: config; user: User }) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Email", sql.VarChar, user.email);
    request.input(
      "Password",
      sql.VarChar,
      bcrypt.hashSync(user.password, bcrypt.genSaltSync())
    );
    let result = await request.query<User>(
      `SELECT * FROM [dbo].[User] WHERE Email = @Email AND Password = @Password`
    );
    return result.recordset[0];
  } catch (err) {
    console.log(err);
  }
};

export default getUser;
