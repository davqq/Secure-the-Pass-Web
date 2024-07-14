import { useEffect, useState } from "react";
import getCookie from "../helper/getCookie";
import { useParams } from "react-router-dom";

const accountEdit = () => {
  const { accountId } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/accounts/${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getCookie("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.Username);
        setEmail(data.Email);
        setPassword(data.Password);
        setWebsite(data.Website);
        setNotes(data.Notes);
        setUrl(data.Url);
      });
  }, [accountId]);

  const generatePassword = () => {
    fetch(import.meta.env.VITE_API_URL + "/generatePassword", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getCookie("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPassword(data.password);
      });
  };

  const editAccount = () =>
    fetch(import.meta.env.VITE_API_URL + "/accounts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getCookie("jwt")}`,
      },
      body: JSON.stringify({
        Guid: accountId,
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
        editAccount();
        window.location.replace(`/accounts/${accountId}`);
      }}
    >
      <div className="justify-center">
        <h1 className="block text-4xl font-medium text-white">Edit Account</h1>
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
          content={website}
          onChange={(e) => setWebsite(e.target.value)}
          id="website"
          name="website"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="Davq.de"
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="username"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="David"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="Url" className="block text-sm font-medium text-white">
          Url
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id="url"
          name="url"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="www.davq.de"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="example@davq.de"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Password
        </label>
        <div className="flex">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
            placeholder="•••••••"
          />
          <button type="button">
            <div
              onClick={() => generatePassword()}
              className={`w-5 h-5 -mx-8 bg-gray-700 bg-searchspinner`}
            />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="notes" className="block text-sm font-medium text-white">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
          className="appearance-none block w-full px-3 py-2 border min-h-[10rem] border-gray-700 rounded-md shadow-sm placeholder-gray-400  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white bg-gray-700"
          placeholder="Here are some notes about the account."
        ></textarea>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <button
          type="submit"
          className=" justify-center py-2 px-7 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
        <button
          type="reset"
          onClick={() => {
            window.location.replace(`/accounts/${accountId}`);
          }}
          className="  flex justify-center py-2 px-7 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default accountEdit;
