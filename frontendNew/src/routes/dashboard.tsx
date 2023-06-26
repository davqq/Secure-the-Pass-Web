import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-64 bg-white">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-xl font-bold text-gray-800">Logo</span>
          <button className="p-2 rounded-md hover:bg-gray-200">
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col flex-grow px-4 py-8">
          <a
            href="#"
            className="flex items-center py-2 text-gray-700 hover:bg-gray-200"
          >
            <span className="mr-2">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A10.93 10.93 0 0 1 12.04 15M19.78 18A15.91 15.91 0 0 0 12 19.77a15.91 15.91 0 0 0-7.78-1.77M10.96 9.32a9 9 0 0 1 2.64-6.32a9.08 9.08 0 0 1 12.72 0a9.08 9.08 0 0 1 0 12.72a9 9 0 0 1-6.32 2.64" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </span>
            Dashboard
          </a>
          {/* More sidebar links here */}
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="h-16 bg-white border-b"></div>
        <div className="flex-grow p-6"></div>
      </div>
    </div>
  );
};

export default Dashboard;
