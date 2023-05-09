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
    <div
      id="contact"
      className="max-w-full flex flex-nowrap flex-col justify-start items-start"
    >
      <h1 className="flex items-start gap-4 text-[2rem] font-[700] m-0 leading-[1.2]">
        {account?.UrlName || account?.Url} <Favorite {...account} />
      </h1>

      <br />
      <br />

      <table className="flex flex-col flex-wrap w-full justify-start border-solid border rounded-xl">
        <tr className="p-[10px] flex flex-col w-full overflow-hidden text-ellipsis border-bottom-solid border-b">
          <td className="text-sm text-headline">username</td>
          <td>{account.Username}</td>
        </tr>
        <tr className="p-[10px] flex flex-col w-full overflow-hidden text-ellipsis border-bottom-solid border-b">
          <td className="text-sm text-headline">email</td>
          <td>{account.Email}</td>
        </tr>
        <tr className="p-[10px] flex flex-col w-full overflow-hidden text-ellipsis">
          <td className="text-sm text-headline">password</td>
          <td className="overflow-auto">{account.Password}</td>
        </tr>
      </table>

      {account.Url && (
        <tr className="p-[10px] flex flex-col w-full overflow-hidden">
          <td className="text-sm text-headline">website</td>
          <td>
            <a href={account.Url}>{account.Url}</a>
          </td>
        </tr>
      )}

      {account.Notes && (
        <tr className="p-[10px] flex flex-col w-full overflow-hidden">
          <td className="text-sm text-headline">notes</td>
          <td>{account.Notes}</td>
        </tr>
      )}

      <br />

      {account?.UpdatedAt && (
        <i className="flex text-[#818181] justify-center w-full">
          modified: {new Date(account.UpdatedAt).toLocaleString()}
        </i>
      )}
      {account?.CreatedAt && (
        <i className="flex text-[#818181] justify-center w-full">
          created: {new Date(account.CreatedAt).toLocaleString()}
        </i>
      )}
    </div>
  );
};

function Favorite(account: Account) {
  let favorite = account.Favorite;
  return (
    <div className="flex items-center mt-1">
      <button
        name="favorite"
        className="text-[1.5rem] font-[400] p-0"
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
