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
  CreatedAt: Date;
  UpdatedAt: Date;
  UrlName: string;
  favorite: boolean;
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
      <div id="sidebar">
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={loading ? "loading" : ""}
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
            <div id="search-spinner" aria-hidden hidden={!loading} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {!accounts?.length ? (
            <p>No accounts yet</p>
          ) : (
            <ul>
              {accounts.map((account: Account) => (
                <li key={account.Guid}>
                  <NavLink
                    to={`/account/${account.Guid}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {account.UrlName || account.Url || <i>No Name</i>}{" "}
                    {account.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default root;
