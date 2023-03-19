import { servicesVersion } from 'typescript';
import './Home.css'

export async function loader() {
    // await sleep(1000);
    localStorage.getItem("darkMode") === "true" && document.body.classList.add("dark-mode");
    return null;
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

export default function Home() {
    const searching = navigation.location
        && new URLSearchParams(navigation.location.search).has(
            "q"
        );

    return (
        <>
            <nav className="sidebar close">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img
                                src="https://i.ibb.co/7bQQYkX/avataaars.png"
                                alt=""
                            />
                        </span>

                        <div className="text logo-text">
                            <span className="name">David</span>
                            <span className="profession">Web developer</span>
                        </div>
                    </div>

                    <i className="bx bx-chevron-right toggle" onClick={() => {
                        const body = document.querySelector("body"),
                            sidebar = body.querySelector("nav");
                        sidebar.classList.toggle("close");
                    }}></i>
                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <li className="search-box" role="search">
                            <input
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
                            ></div>
                            {/* <i className="bx bx-search icon" onClick={() => {
                                const body = document.querySelector("body"),
                                    sidebar = body.querySelector("nav");
                                sidebar.classList.toggle("close");
                            }} ></i>
                            <input type="text" placeholder="Search..." /> */}
                        </li>

                        <ul className="menu-links">
                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-home-alt icon"></i>
                                    <span className="text nav-text">Dashboard</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-bar-chart-alt-2 icon"></i>
                                    <span className="text nav-text">Passwords</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-setting icon"></i>
                                    <span className="text nav-text">Notifications</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-pie-chart-alt icon"></i>
                                    <span className="text nav-text">Analytics</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                    <i className="bx bx-heart icon"></i>
                                    <span className="text nav-text">Likes</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="nav-link">
                            <a href="#">
                                <i className="bx bx-wallet icon"></i>
                                <span className="text nav-text">Settings</span>
                            </a>
                        </li>

                        <li className="">
                            <a href="#" >
                                <i className="bx bx-log-out icon"></i>
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>

                        <li className="mode">
                            <div className="sun-moon">
                                <i className="bx bx-sun icon sun"></i>
                                <i className="bx bx-moon icon moon"></i>
                            </div>
                            <span className="mode-text text">Light mode</span>

                            <div className="toggle-switch">
                                <span className="switch" onClick={modeSwitchClick}></span>
                            </div>
                        </li>
                    </div>
                </div>
            </nav>
            {/* 
            <section className="home">
                <div className="text">Dashboard Sidebar</div>
                <div className="wrapper">
                    <div id="formContent">
                        <form>
                            <input type="text" id="email" name="login" placeholder="Email" />
                            <input type="text" id="email" name="login" placeholder="asdf" />
                        </form>
                    </div>
                </div>
            </section> */}

        </>
    )
}

function modeSwitchClick() {
    const body = document.querySelector("body"),
        modeText = body.getElementsByClassName(".mode-text text");

    localStorage.setItem("dark", body.classList.contains("dark"));

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Dark mode";
    } else {
        modeText.innerText = "Light mode";
    }
}