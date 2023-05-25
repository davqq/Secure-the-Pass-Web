import {
  Form,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import env from "react-dotenv";
import getCookie from "../helper/getCookie";
import { useEffect, useRef, useState } from "react";
import formatUpdatedAt from "../helper/formattedDate";

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
  const [accounts, setAccounts] = useState<Account[]>([]);
  const controllerRef = useRef<AbortController | null>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isChildControl = location.pathname.includes("/account/");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const shouldHideControl = windowWidth <= 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const groupAccountsByMonth = (
    accounts: Account[]
  ): Record<string, Record<string, Account[]>> => {
    const groupedAccounts: Record<string, Record<string, Account[]>> = {};

    accounts.forEach((account) => {
      const updatedAt = new Date(account.UpdatedAt);
      const year = updatedAt.getFullYear();
      const month = updatedAt.getMonth() + 1;
      const day = updatedAt.getDate();

      const monthKey = `${year}-${month}`;
      const dayKey = `${year}-${month}-${day}`;

      if (!groupedAccounts[monthKey]) {
        groupedAccounts[monthKey] = {};
      }

      if (groupedAccounts[monthKey][dayKey]) {
        groupedAccounts[monthKey][dayKey].push(account);
      } else {
        groupedAccounts[monthKey][dayKey] = [account];
      }
    });

    return groupedAccounts;
  };

  const groupedAccounts = groupAccountsByMonth(accounts);

  const formatMonth = (month: string): string => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Januar ist 0-basiert
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    const [year, monthNumber, day] = month.split("-").map(Number);

    if (
      currentYear === year &&
      currentMonth === monthNumber &&
      currentDay === day
    ) {
      return "Today";
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

    const monthDiff = (currentYear - year) * 12 + (currentMonth - monthNumber);

    if (monthDiff <= 7) {
      return "Previous 7 Days";
    } else if (monthDiff <= 30) {
      return "Previous 30 Days";
    } else {
      return monthNames[monthNumber - 1];
    }
  };

  return (
    <>
      {(!shouldHideControl || !isChildControl) && (
        <div className="flex flex-col w-72 border-solid border-r bg-[#f7f7f7]">
          <div className="pl-8 pr-8 flex items-center gap-2 pt-4 pb-4 border-b">
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
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
                {Object.keys(groupedAccounts).map((month) => (
                  <div key={month}>
                    <h2>{formatMonth(month)}</h2>
                    <ul className="p-0 m-0 list-none">
                      {groupedAccounts[month].map((account) => (
                        <li className="mt-1 mb-1" key={account.Guid}>
                          <NavLink
                            to={`/account/${account.Guid}`}
                            id="accountList"
                            className="flex items-center justify-between overflow-hidden whitespace-pre p-2 rounded-lg text-inherit no-underline gap-4 hover:bg-[#e3e3e3]"
                          >
                            {account.UrlName || account.Url || (
                              <i className="text-inherit">No Name</i>
                            )}{" "}
                            {account.Favorite && (
                              <span className="float-right text-[#eeb004]">
                                ★
                              </span>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>
            )}
          </nav>
        </div>
      )}
      {(!shouldHideControl || isChildControl) && (
        <div
          id="detail"
          className="flex-1 pb-16 pt-16 pl-8 pr-8 w-full bg-[#fff] overflow-scroll"
        >
          <Outlet />
        </div>
      )}
    </>
  );
};

export default root;
