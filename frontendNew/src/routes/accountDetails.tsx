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
    <div id="AccountDetails">
      <div id="AccountDetailsHeader">
        <h1>{account?.urlName || account?.Url}</h1>
        <Favorite {...account} />
      </div>
      {/* <div id="AccountDetailsBody"> */}
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
