import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Account } from "./root";
import getCookie from "../helper/getCookie";
import env from "react-dotenv";

const accountDetails = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState<Account>();

  console.log(account?.CreatedAt);
  console.log(typeof account?.CreatedAt);

  useEffect(() => {
    fetch(`${env.API_URL}/getaccount/${accountId}`, {
      method: "GET",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${getCookie("jwt")}`],
      ],
    })
      .then((res) => res.json())
      .then((result) => {
        setAccount(result);
      });
  }, [accountId]);

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div id="contact">
      <h1>
        {account?.UrlName || account?.Url} <Favorite {...account} />
      </h1>

      <br />
      <br />

      <table className="Accountdetails">
        <tr>
          <td>Username:</td>
          <td>{account.Username}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{account.Email}</td>
        </tr>
        <tr>
          <td>Password:</td>
          <td>{account.Password}</td>
        </tr>
      </table>
      <br />

      {account?.Notes && <i>notes: {account.Notes}</i>}
      {account?.UpdatedAt && <i>modified: {account.UpdatedAt.toString()}</i>}
      {account?.CreatedAt && <i>created: {account.CreatedAt.toString()}</i>}
    </div>
  );
};

function Favorite(account: Account) {
  // yes, this is a `let` for later
  let favorite = account.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

export default accountDetails;
