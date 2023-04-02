import sql, { config } from "mssql";
import { User } from "../user/adduser";

const updateuser = async ({ config, user }: { config: config; user: User }) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Email", sql.VarChar, user.email);
    request.input("Password", sql.VarChar, user.password);
    request.input("Username", sql.VarChar, user.username);
    request.input("Guid", sql.VarChar, user.Guid);
    request.query(
      `UPDATE [dbo].[User] SET Username = @Username, Email = @Email, Password = @Password WHERE Guid = @Guid`
    );
  } catch (err) {
    console.log(err);
  }
};

export default updateuser;
