import sql, { config } from "mssql";
import { User } from "../user/createUser";
import handleSuccess from "../handleSuccess";
import { Response } from "express";
import { handleError } from "../handleError";

const deleteAccount = async ({
  config,
  user,
  accountGuid,
  res,
}: {
  config: config;
  user: User;
  accountGuid: string;
  res: Response;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, accountGuid);
    request.input("UserGuid", sql.VarChar, user.Guid);
    await request.query(
      `DELETE FROM [dbo].[Account] WHERE Guid = @Guid AND UserGuid = @UserGuid`
    );
    handleSuccess({ success: "Delete Account successfull" }, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default deleteAccount;
