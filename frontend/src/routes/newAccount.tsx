import { useState } from "react";
import getCookie from "../helper/getCookie";

const NewAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");

  const addAccount = () =>
    fetch(import.meta.env.VITE_API_URL + "/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getCookie("jwt")}`,
      },
      body: JSON.stringify({
        Username: username,
        Email: email,
        Password: password,
        Website: website,
        Notes: notes,
        Url: url,
      }),
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addAccount();
      }}
    >
      <div className="justify-center">
        <h1 className="block text-4xl font-medium text-white">New Account</h1>
      </div>
      <div className="mt-4">
        <label
          htmlFor="website"
          className="block text-sm font-medium text-white"
        >
          Website
        </label>
        <input
          type="text"
          onChange={(e) => setWebsite(e.target.value)}
          id="website"
          name="website"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-no-repeat bg-[length:1em] bg-leftWithPadding focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="Website"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-white"
        >
          Username
        </label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="username"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-no-repeat bg-[length:1em] bg-leftWithPadding focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="Username"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="Url" className="block text-sm font-medium text-white">
          Url
        </label>
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          id="url"
          name="url"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-no-repeat bg-[length:1em] bg-leftWithPadding focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="Url"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-no-repeat bg-[length:1em] bg-leftWithPadding focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="Email"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Password
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-no-repeat bg-[length:1em] bg-leftWithPadding focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="Password"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="notes" className="block text-sm font-medium text-white">
          Notes
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
          className="appearance-none block w-full px-3 py-2 border min-h-[10rem] border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-no-repeat bg-[length:1em] bg-leftWithPadding focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="Notes"
        ></textarea>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default NewAccount;
