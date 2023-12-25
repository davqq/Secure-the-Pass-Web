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

export interface User {
  Guid: string;
  Username: string;
  Email: string;
}

const AccountsOverview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const controllerRef = useRef<AbortController | null>();
  const [loading, setLoading] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);
  const popUpRef = useRef<HTMLDivElement>(null);
  const [groupedAccounts, setGroupedAccounts] = useState<{
    [key: string]: Account[];
  }>({});

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 640px)").matches
  );

  window.matchMedia("(min-width: 640px)").onchange = (e) => {
    setMatches(e.matches);
  };

  useEffect(() => {
    fetch(`${env.API_URL}/getuser`, {
      method: "GET",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${getCookie("jwt")}`],
      ],
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });

    window.location.href.includes("/accounts/") && setNavbarVisible(false);
  }, []);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setTimeout(() => {
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
    }, 700);
  }, [searchParams]);

  useEffect(() => {
    const updatedGroupedAccounts: { [key: string]: Account[] } = {};
    accounts.forEach((account: Account) => {
      const groupLabel: string = getGroupLabel(account.UpdatedAt);

      if (!updatedGroupedAccounts[groupLabel]) {
        updatedGroupedAccounts[groupLabel] = [];
      }

      updatedGroupedAccounts[groupLabel].push(account);
    });

    setGroupedAccounts(updatedGroupedAccounts);
  }, [accounts]);

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
      return "Past 7 days";
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

  const toggleNavbarVisibility = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <div className="flex w-full bg-[#111827] justify-center">
      {(matches || navbarVisible) && (
        <div className="flex flex-col w-80 border-solid border-gray-600 border-x bg-gray-900 max-[640px]:w-full">
          <div className="flex items-center pl-8 pr-8 gap-2 pt-4 pb-4 border-b border-gray-600 ">
            <form id="search-form" role="search" className="w-full flex">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                autoFocus={matches}
                type="search"
                name="q"
                className={`appearance-none block w-full px-3 py-2 pl-7 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-no-repeat bg-[length:1em] bg-leftWithPadding focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700`}
                value={searchParams.get("q") || ""}
                onChange={(e) =>
                  setSearchParams(
                    { q: e.target.value },
                    { replace: searchParams.has("q") }
                  )
                }
              />
              <div
                className={`w-4 h-4  animate-spin ml-2 bg-searchspinner z-10 sm:w-3.5 sm:h-3.5 ${
                  loading ? "animate-spin" : "animate-none"
                }`}
              />
            </form>
            <a
              href="/accounts/new"
              type="submit"
              className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
            >
              New
            </a>
          </div>
          <nav className="flex-1 overflow-auto pt-4 px-8">
            {!groupedAccounts ||
            Object.entries(groupedAccounts).length === 0 ? (
              <p className="text-white">No accounts yet</p>
            ) : (
              Object.entries(groupedAccounts).map(([groupLabel, accounts]) => (
                <li className="list-none" key={groupLabel}>
                  <p className="font-bold text-xs text-gray-400">
                    {groupLabel}
                  </p>
                  <ul className="p-0 m-0">
                    {accounts.map((account: Account) => (
                      <li className="mt-1 mb-1" key={account.Guid}>
                        <NavLink
                          to={`/accounts/${account.Guid}`}
                          id="accountList"
                          onClick={() => !matches && setNavbarVisible(false)}
                          className="flex items-center justify-between p-2 rounded-xl text-white no-underline gap-4 hover:bg-gray-600"
                        >
                          <div className="flex items-center min-h-[3em]">
                            <div className="w-56 ml-2 flex flex-col">
                              {account.Url ? (
                                <span className="text-ellipsis overflow-hidden whitespace-nowrap ">
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
          <div
            className="relative flex py-2 px-8 border-solid mb-2 border-gray-600 border-t"
            onBlurCapture={(event) => {
              if (
                popUpRef.current &&
                !popUpRef.current.contains(event.relatedTarget)
              ) {
                setIsOpen(false);
              }
            }}
          >
            <div
              ref={popUpRef}
              className={`absolute w-4/5 self-center bottom-full z-20 mb-2 overflow-hidden rounded-xl bg-gray-950 pb-1.5 pt-1 outline-none ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              } transition-transform duration-200 ease-in-out`}
            >
              <nav role="none">
                <a
                  className="flex p-3 rounded-xl gap-3 items-center w-full text-white cursor-pointer text-sm hover:bg-gray-700"
                  href="/logout"
                  role="menuitem"
                  tabIndex={-1}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Log out
                </a>
              </nav>
            </div>
            <button
              className="w-full flex items-center justify-between p-2 rounded-xl text-white no-underline hover:bg-gray-600 min-h-[3em] focus:bg-gray-600"
              aria-haspopup={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              {user?.Username}
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4 flex-shrink-0 text-gray-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      )}

      {(matches || !navbarVisible) && (
        <div className="flex border-solid border-r border-gray-600 max-w-3xl">
          {!matches && (
            <button
              className="absolute mt-5 ml-5 text-white"
              onClick={toggleNavbarVisibility}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 15.707a1 1 0 0 1-1.414-1.414L11.586 10l-5.707-5.293a1 1 0 1 1 1.414-1.414l6 6a1 1 0 0 1 0 1.414l-6 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <div
            id="detail"
            className="flex-1 py-16 px-8 w-full bg-gray-900 overflow-auto"
          >
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsOverview;