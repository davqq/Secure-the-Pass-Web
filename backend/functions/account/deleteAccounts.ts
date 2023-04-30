import sql, { config } from "mssql";
import handleSuccess from "../handleSuccess";
import { Response } from "express";
import { handleError } from "../handleError";

const deleteAccount = async ({
  config,
  accountGuid,
  res,
}: {
  config: config;
  accountGuid: string;
  res: Response;
}) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    request.input("Guid", sql.VarChar, accountGuid);
    await request.query(`DELETE FROM [dbo].[Account] WHERE Guid = @Guid`);
    handleSuccess({ success: "Delete Account successfull" }, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default deleteAccount;
