import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Account } from "./AccountsOverview";
import getCookie from "../helper/getCookie";
import eyeOpen from "../assets/visibility_FILL1_wght400_GRAD0_opsz24.svg";
import eyeClosed from "../assets/visibility_off_FILL1_wght400_GRAD0_opsz24.svg";

const accountDetails = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState<Account>();
  const [loading, setLoading] = useState(true);
  const controllerRef = useRef<AbortController | null>();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setTimeout(() => {
      fetch(`${import.meta.env.VITE_API_URL}/getaccount/${accountId}`, {
        method: "GET",
        signal: controllerRef.current?.signal,
        headers: [
          ["Content-Type", "application/json"],
          ["Authorization", `${getCookie("jwt")}`],
        ],
      })
        .then((res) => res.json())
        .then((result) => {
          setAccount(result);
          setLoading(false);
          setFavorite(result.Favorite);
        });
    }, 700);
  }, [accountId]);

  if (!account || loading) {
    return (
      <div className="max-w-full flex flex-nowrap flex-col justify-start items-start animate-pulse">
        <div className="flex items-center mt-4 space-x-3">
          <svg
            className="text-gray-200 w-14 h-14 dark:text-gray-700 "
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          </div>
        </div>

        <br />
        <div className="grid grid-rows-3 grid-flow-col auto-rows-max w-full border-solid border border-gray-600 rounded-xl">
          <div className="p-2.5 overflow-auto border-b border-gray-600">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="p-2.5 overflow-auto border-b border-gray-600">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="p-2.5 overflow-auto">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>

        <br />

        <div className="w-full items-center justify-center flex ">
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full flex flex-nowrap flex-col justify-start items-start">
      <div className="flex">
        <h1 className="text-[2rem] font-[700] m-4 leading-[1.2] text-center items-center flex text-white">
          {account?.Url}
        </h1>
        <Favorite {...account} />
      </div>

      <br />
      <div className="grid-rows-3 grid-flow-col w-full border-solid border border-gray-600 rounded-xl">
        {account?.Username && (
          <div className="p-2.5 overflow-auto border-b border-gray-600">
            <div className="text-sm text-headline">username</div>
            <div className="text-white">{account.Username}</div>
          </div>
        )}
        {account?.Email && (
          <div className="p-2.5 overflow-auto border-b border-gray-600">
            <div className="text-sm text-headline">email</div>
            <div className="text-white">{account.Email}</div>
          </div>
        )}
        {account?.Password && (
          <div className="p-2.5 overflow-auto">
            <div className="text-sm text-headline">password</div>
            <div className="flex">
              <div className="text-white">
                {showPassword
                  ? account.Password
                  : "•".repeat(account.Password.length)}
              </div>
              <button
                className="text-white ml-2"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <img className="h-5" src={eyeClosed} alt="Logo" />
                ) : (
                  <img className="h-5" src={eyeOpen} alt="Logo" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      {account.Url && (
        <div className="p-2.5 flex flex-col overflow-hidden">
          <p className="text-sm text-headline">website</p>
          <p className="text-white">{account.Url}</p>
        </div>
      )}
      {account.Notes && (
        <div className="p-2.5 flex flex-col w-full overflow-hidden">
          <p className="text-sm text-headline">notes</p>
          <p className="text-white">{account.Notes}</p>
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
  const [favorite, setFavorite] = useState(account?.Favorite);

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
          }).then((res) => {
            if (res.status === 200) {
              setFavorite(!favorite);
            }
          });
        }}
      >
        {favorite ? "★" : "☆"}
      </button>
    </div>
  );
}

export default accountDetails;
