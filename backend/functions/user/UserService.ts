import { generateAccessToken } from "../authentication/AuthenticationService";
import sql, { config } from "mssql";

export interface User {
  Guid: string;
  email: string;
  username: string;
  password: string;
}

const users: User[] = [
  {
    email: "test@test.com",
    username: "test",
    password: "123",
    Guid: "452b7495-b661-4990-9b7b-df42c7a4ba56",
  },
];

export const TestSqlConnect = async (config: config) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("Select * from [dbo].[User]");
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
    return new Response("User not found", { status: 404 });
  }

  return { token: generateAccessToken(userFound) };
}

export function RegisterUser(user: User) {
  if (users.find((u) => u.email === user.email)) {
    return new Response("User exists", { status: 403 } );
  }

  users.push(user);
  return generateAccessToken(user);
}
