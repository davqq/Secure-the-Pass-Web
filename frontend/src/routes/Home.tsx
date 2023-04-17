import React, { useEffect, useState } from "react";
import "./Home.css";
import { Outlet } from "react-router-dom";
import env from "react-dotenv";

export async function loader() {
  fetch(`${env.API_URL}/checktoken`, {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Authorization", `${document.cookie}`],
    ],
  }).then((result) => {
    if (result.status === 403 || result.status === 401) {
      return window.location.replace("/login");
    }
  });

  if (localStorage.getItem("dark") === "true") {
    (document.querySelector("body") as HTMLBodyElement).classList.add("dark");
  }

  return null;
}

export interface User {
  Guid: string;
  Username: string;
  Email: string;
}

export default function Home() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    fetch(`${env.API_URL}/getuser`, {
      method: "GET",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${document.cookie}`],
      ],
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  // const searching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <nav className="sidebar close">
        <header>
          <div className="image-text">
            <span className="image">
              <img alt="logo" />
            </span>

            <div className="text logo-text">
              <span className="name">{user?.Username}</span>
              <span className="profession">{user?.Email}</span>
            </div>
          </div>

          <i
            className="bx bx-chevron-right toggle"
            onClick={() => {
              const body: HTMLBodyElement = document.querySelector(
                  "body"
                ) as HTMLBodyElement,
                sidebar: HTMLBodyElement = body.querySelector(
                  "nav"
                ) as HTMLBodyElement;
              sidebar.classList.toggle("close");
            }}
          ></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box" role="search">
              {/* <input
                                id="q"
                                aria-label="Search contacts"
                                placeholder="Search"
                                type="search"
                                name="q"
                                className={searching ? "loading" : ""}
                            />
                            <div
                                id="search-spinner"
                                aria-hidden
                                hidden={!searching}
                            />
                            <div
                                className="sr-only"
                                aria-live="polite"
                            ></div> */}

              <i
                className="bx bx-search icon"
                onClick={() => {
                  const body = document.querySelector(
                      "body"
                    ) as HTMLBodyElement,
                    sidebar = body.querySelector("nav") as HTMLBodyElement;
                  sidebar.classList.toggle("close");
                }}
              ></i>
              <input type="name" placeholder="Search..." />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <a href="/">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            {/* <li className="nav-link">
              <a href="/settings">
                <i className="bx bx-wallet icon"></i>
                <span className="text nav-text">Settings</span>
              </a>
            </li> */}

            <li className="">
              <a href="/logout">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-sun icon sun"></i>
                <i className="bx bx-moon icon moon"></i>
              </div>
              <span id="switchtext" className="mode-text text">
                Light mode
              </span>

              <div className="toggle-switch">
                <span className="switch" onClick={modeSwitchClick}></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

function modeSwitchClick() {
  const body = document.querySelector("body") as HTMLBodyElement,
    modeText = body.querySelector("#switchtext") as HTMLBodyElement;

  localStorage.setItem("dark", (!body.classList.contains("dark")).toString());

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Dark mode";
  } else {
    modeText.innerText = "Light mode";
  }
}
