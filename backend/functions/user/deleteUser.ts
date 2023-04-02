import sql, { config } from "mssql";
import { User } from "./createUser";

const deleteUser = async ({ config, user }: { config: config; user: User }) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Email", sql.VarChar, user.email);
    request.input("Password", sql.VarChar, user.password);
    request.query(
      `DELETE FROM [dbo].[User] WHERE Email = @Email AND Password = @Password`
    );
  } catch (err) {
    console.log(err);
  }
};

export default deleteUser;
