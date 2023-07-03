import React from "react";
const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar / Start */}
      <div className="bg-white w-64 flex flex-col">
        {/* Logo section */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V7.414A2 2 0 0018.414 6L14 1.586A2 2 0 0012 2z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2 6a2 2 0 012-2h6v2a2 2 0 01-2 2H4a2 2 0 01-2-2z"
              ></path>
            </svg>
            <span className="text-gray-600 ml-3 text-2xl font-bold">
              My Brand
            </span>
          </div>
        </div>
        {/* Nav section */}
        <nav className="mt-10 px-6 ">
          <a
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white"
            href="#"
          >
            Item 1
          </a>
          <a
            className="block mt-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white"
            href="#"
          >
            Item 2
          </a>
          <a
            className="block mt-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white"
            href="#"
          >
            Item 3
          </a>
          <a
            className="block mt-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white"
            href="#"
          >
            Item 4
          </a>
        </nav>
      </div>
      {/* Sidebar / End */}
      {/* Main content / Start */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 bg-blue-500 text-white shadow-lg">
          <h2 className="text-lg leading-none">Dashboard</h2>
        </header>
        <main className="flex-1 p-4 overflow-y-scroll">
          {/* Main content goes here */}
        </main>
      </div>
      {/* Main content / End */}
    </div>
  );
};
export default Dashboard;
