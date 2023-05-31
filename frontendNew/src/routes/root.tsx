import {
  Form,
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import env from "react-dotenv";
import getCookie from "../helper/getCookie";
import { useEffect, useRef, useState } from "react";
import CompanyLogo from "./CompanyLogo";

export interface Account {
  Guid: string;
  Username: string;
  Email: string;
  Url: string;
  Password: string;
  Notes: string;
  CreatedAt: string;
  UpdatedAt: string;
  Favorite: boolean;
}

const root = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const controllerRef = useRef<AbortController | null>();
  const [loading, setLoading] = useState(true);
  const [groupedAccounts, setGroupedAccounts] = useState<{
    [key: string]: Account[];
  }>({});

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

  const getGroupLabel = (updatedAt: string) => {
    const today = new Date();
    const updatedDate = new Date(updatedAt);

    if (
      updatedDate.getDate() === today.getDate() &&
      updatedDate.getMonth() === today.getMonth() &&
      updatedDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    const diffTime = Math.abs(today.getTime() - updatedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return "This week";
    }

    if (
      updatedDate.getMonth() === today.getMonth() &&
      updatedDate.getFullYear() === today.getFullYear()
    ) {
      return "This month";
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[updatedDate.getMonth()];
  };

  useEffect(() => {
    // ...
    const updatedGroupedAccounts: { [key: string]: Account[] } = {};
    accounts.forEach((account: Account) => {
      const groupLabel: string = getGroupLabel(account.UpdatedAt);

      if (!updatedGroupedAccounts[groupLabel]) {
        updatedGroupedAccounts[groupLabel] = [];
      }

      updatedGroupedAccounts[groupLabel].push(account);
    });

    setGroupedAccounts(updatedGroupedAccounts);
    // ...
  }, [accounts]);
  return (
    <>
      <div className="flex flex-col w-80 border-solid border-r bg-[#f7f7f7]">
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
          <button
            type="submit"
            className="text-base font-[inherit] text-[#3992ff] border-none rounded-lg pt-2 pb-2 pl-3 pr-3 shadow-sm bg-white hover:shadow active:shadow-md active:translate-y-px"
          >
            New
          </button>
        </div>
        <nav className="flex-1 overflow-auto pt-4 pl-8 pr-8">
          {!groupedAccounts || Object.entries(groupedAccounts).length === 0 ? (
            <p>No accounts yet</p>
          ) : (
            Object.entries(groupedAccounts).map(([groupLabel, accounts]) => (
              <li className="list-none" key={groupLabel}>
                <p className="font-bold text-xs text-gray-600">{groupLabel}</p>
                <ul className="p-0 m-0">
                  {accounts.map((account: Account) => (
                    <li className="mt-1 mb-1" key={account.Guid}>
                      <NavLink
                        to={`/account/${account.Guid}`}
                        id="accountList"
                        className="flex items-center justify-between p-2 rounded-xl text-inherit no-underline gap-4 hover:bg-gray-300"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <CompanyLogo companyName={account.Url} />
                            {account.Favorite && (
                              <span className="absolute right-0 bottom-0 text-[#eeb004] rounded-r text-xl">
                                ★
                              </span>
                            )}
                          </div>
                          <div className="w-40 ml-2 flex flex-col">
                            {account.Url ? (
                              <span className=" text-ellipsis overflow-hidden  whitespace-nowrap ">
                                {account.Url}
                              </span>
                            ) : (
                              <i className="text-inherit">No Name</i>
                            )}

                            <span className="text-xs text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden">
                              {account.Email}
                            </span>
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </nav>
      </div>

      <div
        id="detail"
        className="flex-1 pb-16 pt-16 pl-8 pr-8 w-full bg-[#fff] overflow-scroll"
      >
        <Outlet />
      </div>
    </>
  );
};

export default root;
