import React, { useState, useEffect } from "react";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {isMobile ? (
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold">Sidebar</h1>
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="block w-full border border-gray-300 rounded-md py-2 px-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <nav className="overflow-y-auto flex-1">
            <ul className="py-4 space-y-2 px-4">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
          <div className="px-4 py-2 border-t">
            <button className="flex items-center text-gray-500 hover:text-gray-600">
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 2.75a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 2.75zm0 6a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8.75zm0 6a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Account
            </button>
          </div>
        </div>
      ) : (
        <div className="w-64 bg-white shadow">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold">Sidebar</h1>
          </div>
          <nav>
            <ul className="py-4">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
          <div className="px-4 py-2 border-t">
            <button className="flex items-center text-gray-500 hover:text-gray-600">
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 2.75a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 2.75zm0 6a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8.75zm0 6a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Account
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <header className="flex-shrink-0">
          <div className="h-16 flex items-center justify-between px-4 bg-white shadow-lg">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none hover:text-gray-600"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold">Header</h2>
            <div>
              {/* Account symbol */}
              <button className="flex items-center text-gray-500 hover:text-gray-600">
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 2.75a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 2.75zm0 6a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8.75zm0 6a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                Account
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Main Content
              </h2>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Content goes here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
