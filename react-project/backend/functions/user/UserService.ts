import { generateAccessToken } from "../authentication/AuthenticationService";
import sql from "mssql";

export interface User {
  email: string;
  username: string;
  password: string;
}

const users: User[] = [
  {
    email: "test@test.com",
    username: "test",
    password: "123",
  },
];

const config = {
  user: "sa",
  password: "0000",
  server: "localhost",
  database: "Test",
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

export const TestSqlConnect = async () => {
  try {
    let pool = await sql.connect(
      "Server=localhost;Database=master;Trusted_Connection=True;"
    );
    let result = await pool.request().query("select * from [dbo].[User]");
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export function CheckUser(user: User) {
  const userFound = users.find(
    (u) => u.email === user.email && u.password === user.password
  );

  if (!userFound) {
    return null;
  }

  return generateAccessToken(userFound);
}

export function RegisterUser(user: User) {
  if (users.find((u) => u.email === user.email)) {
    return null;
  }

  users.push(user);
  return generateAccessToken(user);
}
