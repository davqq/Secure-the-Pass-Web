import sql, { config } from "mssql";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export interface User {
  Guid: string;
  Email: string;
  Username: string;
  Password: string;
}

const createUser = async ({ config, user }: { config: config; user: User }) => {
  let pool = await sql.connect(config);
  let request = pool.request();
  user.Guid = uuid();
  request.input("Guid", sql.VarChar, user.Guid);
  request.input("Email", sql.VarChar, user.Email);
  request.input("Username", sql.VarChar, user.Username);
  request.input(
    "Password",
    sql.VarChar,
    bcrypt.hashSync(user.Password, bcrypt.genSaltSync())
  );

  await request.query(
    `INSERT INTO [dbo].[User] (Guid, Email, Username, Password) VALUES (@Guid, @Email, @Username, @Password)`
  );

  return user;
};

export default createUser;
