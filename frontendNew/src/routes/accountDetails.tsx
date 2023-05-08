import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Account } from "./root";
import getCookie from "../helper/getCookie";
import env from "react-dotenv";

const accountDetails = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState<Account>();

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
        <tr className="borderBottom">
          <td className="headline">username</td>
          <td>{account.Username}</td>
        </tr>
        <tr className="borderBottom">
          <td className="headline">email</td>
          <td>{account.Email}</td>
        </tr>
        <tr>
          <td className="headline">password</td>
          <td>{account.Password}</td>
        </tr>
      </table>

      {account.Url && (
        <tr>
          <td className="headline">website</td>
          <td>
            <a href={account.Url}>{account.Url}</a>
          </td>
        </tr>
      )}

      {account.Notes && (
        <tr>
          <td className="headline">notes</td>
          <td>{account.Notes}</td>
        </tr>
      )}

      <br />

      {account?.UpdatedAt && (
        <i>modified: {new Date(account.UpdatedAt).toLocaleString()}</i>
      )}
      {account?.CreatedAt && (
        <i>created: {new Date(account.CreatedAt).toLocaleString()}</i>
      )}
    </div>
  );
};

function Favorite(account: Account) {
  let favorite = account.Favorite;
  return (
    <div className="favorite">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        onClick={() => {
          fetch(env.API_URL + "/updateaccount", {
            method: "PUT",
            headers: [
              ["Content-Type", "application/json"],
              ["Authorization", `${getCookie("jwt")}`],
            ],
            body: JSON.stringify({
              ...account,
              Favorite: !favorite,
            }),
          });
          document.location.reload();
        }}
      >
        {favorite ? "★" : "☆"}
      </button>
    </div>
  );
}

export default accountDetails;
