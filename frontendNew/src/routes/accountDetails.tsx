import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Account } from "./root";
import getCookie from "../helper/getCookie";
import env from "react-dotenv";

const accountDetails = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState<Account>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      });
  }, [accountId]);

  if (!account || loading) {
    return (
      <div
        id="contact"
        className="max-w-full flex flex-nowrap flex-col justify-start items-start animate-pulse"
      >
        <div className="h-2 bg-slate-700 rounded col-span-2 w-3/4"></div>

        <br />
        <div className="grid grid-rows-3 grid-flow-col auto-rows-max w-full border-solid border rounded-xl">
          <div className="p-2.5 overflow-auto border-b">
            <div className="h-2 bg-slate-400 rounded col-span-2 w-1/4 mb-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-2 w-2/4"></div>
          </div>
          <div className="p-2.5 overflow-auto border-b">
            <div className="h-2 bg-slate-400 rounded col-span-2 w-1/4 mb-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-2 w-2/4"></div>
          </div>
          <div className="p-2.5 overflow-auto">
            <div className="h-2 bg-slate-400 rounded col-span-2 w-1/4 mb-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-2 w-2/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full flex flex-nowrap flex-col justify-start items-start">
      <h1 className="flex items-start gap-4 text-[2rem] font-[700] m-0 leading-[1.2] focus:outline-none focus:text-blue-700">
        {account?.UrlName || account?.Url} <Favorite {...account} />
      </h1>

      <br />
      <div className="grid-rows-3 grid-flow-col w-full border-solid border rounded-xl">
        <div className="p-2.5 overflow-auto border-b">
          <div className="text-sm text-headline">username</div>
          <div>{account.Username}</div>
        </div>
        <div className="p-2.5 overflow-auto border-b">
          <div className="text-sm text-headline">email</div>
          <div>{account.Email}</div>
        </div>
        <div className="p-2.5 overflow-auto">
          <div className="text-sm text-headline">password</div>
          <div>{account.Password}</div>
        </div>
      </div>

      {account.Url && (
        <div className="p-2.5 flex flex-col w-full overflow-hidden">
          <p className="text-sm text-headline">website</p>
          <a href={account.Url}>{account.Url}</a>
        </div>
      )}

      {account.Notes && (
        <div className="p-2.5 flex flex-col w-full overflow-hidden">
          <p className="text-sm text-headline">notes</p>
          <p>{account.Notes}</p>
        </div>
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
        className={`text-[1.5rem] font-[400] p-0 border-none ${
          favorite ? "text-[#eeb004] " : "text-[#a4a4a4] hover:text-[#eeb004]"
        }`}
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
