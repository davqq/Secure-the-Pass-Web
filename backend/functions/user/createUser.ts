import sql, { config } from "mssql";
import bcrypt from "bcryptjs";

export interface User {
  Guid: string;
  email: string;
  username: string;
  password: string;
}

const createUser = async ({ config, user }: { config: config; user: User }) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Email", sql.VarChar, user.email);
    request.input(
      "Password",
      sql.VarChar,
      bcrypt.hashSync(user.password, bcrypt.genSaltSync())
    );
    request.input("Username", sql.VarChar, user.username);

    await request.query(
      `INSERT INTO [dbo].[User] (Guid, Email, Username, Password) VALUES (NEWID(), @Email, @Username, @Password)`
    );
  } catch (err) {
    console.log(err);
  }
};

export default createUser;
