import { Form, NavLink, Outlet, useSearchParams } from "react-router-dom";
import env from "react-dotenv";
import getCookie from "../helper/getCookie";
import { useEffect, useRef, useState } from "react";

export interface Account {
  Guid: string;
  Username: string;
  Email: string;
  Url: string;
  Password: string;
  Notes: string;
  CreatedAt: string;
  UpdatedAt: string;
  UrlName: string;
  Favorite: boolean;
}

export const loader = async () => {
  fetch(`${env.API_URL}/checktoken`, {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Authorization", `${getCookie("jwt")}`],
    ],
  }).then((result) => {
    if (result.status === 403 || result.status === 401) {
      return window.location.replace("/logout");
    }
  });

  if (localStorage.getItem("dark") === "true") {
    (document.querySelector("body") as HTMLBodyElement).classList.add("dark");
  }

  return null;
};

const root = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accounts, setAccounts] = useState<Account[]>();
  const controllerRef = useRef<AbortController | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    fetch(`${env.API_URL}/getaccounts/${searchParams.get("q") || ""}`, {
      method: "GET",
      signal: controllerRef.current?.signal,
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${getCookie("jwt")}`],
      ],
    })
      .then((res) => res.json())
      .then((result) => {
        setAccounts(result);
        setLoading(false);
        controllerRef.current = null;
      });
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col w-[22rem] border-solid border-r bg-[#f7f7f7]">
        <div className="pl-8 pr-8 flex items-center gap-2 pt-4 pb-4 border-b">
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={`font-[inherit] text-base border-none rounded-lg pt-2 pb-2 pr-3 shadow-sm bg-white m-0 hover:shadow w-full pl-8 bg-no-repeat bg-leftWithPadding relative bg-[length:1em] ${
                loading ? "bg-none" : "bg-searchspinner"
              }`}
              value={searchParams.get("q") || ""}
              onChange={(e) => {
                setSearchParams(
                  { q: e.target.value },
                  {
                    replace: searchParams.has("q"),
                  }
                );
                setLoading(true);
              }}
            />
            <div
              className="w-4 h-4 animate-spin left-[2.6rem] top-7 absolute bg-searchspinner"
              aria-hidden
              hidden={!loading}
            />
            <div
              className="absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden whitespace-nowrap border-[0]"
              aria-live="polite"
            />
          </form>
          <Form method="post" className="relative">
            <button
              type="submit"
              className="text-base font-[inherit] text-[#3992ff] border-none rounded-lg pt-2 pb-2 pl-3 pr-3 shadow-sm bg-white hover:shadow active:shadow-md active:translate-y-px"
            >
              New
            </button>
          </Form>
        </div>
        <nav className="flex-1 overflow-auto pt-4 pl-8 pr-8">
          {!accounts?.length ? (
            <p>No accounts yet</p>
          ) : (
            <ul className="p-0 m-0 list-none">
              {accounts.map((account: Account) => (
                <li className="m-[0.25rem 0]" key={account.Guid}>
                  <NavLink
                    to={`/account/${account.Guid}`}
                    className="flex items-center justify-between overflow-hidden whitespace-pre p-2 rounded-[8px] text-inherit no-underline gap-4 hover:bg-[#e3e3e3]"
                  >
                    {account.UrlName || account.Url || (
                      <i className="text-inherit">No Name</i>
                    )}{" "}
                    {account.Favorite && (
                      <span className="float-right text-[#eeb004]">★</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className="flex-1 pb-16 pt-16 pl-8 pr-8 w-full bg-[#fff]"
      >
        <Outlet />
      </div>
    </>
  );
};

export default root;
