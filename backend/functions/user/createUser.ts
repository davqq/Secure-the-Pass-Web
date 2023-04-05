import sql, { config } from "mssql";
import bcrypt from "bcryptjs";

export interface User {
  Guid: string;
  Email: string;
  Username: string;
  Password: string;
}

const createUser = async ({ config, user }: { config: config; user: User }) => {
  let pool = await sql.connect(config);
  let request = pool.request();
  request.input("Email", sql.VarChar, user.Email);
  request.input("Username", sql.VarChar, user.Username);
  request.input(
    "Password",
    sql.VarChar,
    bcrypt.hashSync(user.Password, bcrypt.genSaltSync())
  );

  await request.query(
    `INSERT INTO [dbo].[User] (Guid, Email, Username, Password) VALUES (NEWID(), @Email, @Username, @Password)`
  );
};

export default createUser;
