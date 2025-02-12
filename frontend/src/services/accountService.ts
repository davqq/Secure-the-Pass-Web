import { Account } from '../types/Account';

const API_URL = import.meta.env.VITE_API_URL;
const ACCOUNTS_URL = `${API_URL}/accounts`;

const fetchWithAuth = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response;
};

const getAccounts = async (
  search: string,
  controller: AbortController
): Promise<Account[]> => {
  const response = await fetchWithAuth(ACCOUNTS_URL + `?q=${search}`, {
    method: 'GET',
    signal: controller?.signal,
  });
  return response.json();
};

const getAccount = async (
  accountId: string,
  controller?: AbortController | null
): Promise<Account> => {
  const response = await fetchWithAuth(`${ACCOUNTS_URL}/${accountId}`, {
    method: 'GET',
    signal: controller?.signal,
  });
  return response.json();
};

const editAccount = async (account: Account): Promise<void> => {
  await fetchWithAuth(ACCOUNTS_URL, {
    method: 'PUT',
    body: JSON.stringify(account),
  });
};

const addAccount = async (account: Account): Promise<void> => {
  await fetchWithAuth(ACCOUNTS_URL, {
    method: 'POST',
    body: JSON.stringify(account),
  });
};

const deleteAccount = async (accountId: string): Promise<void> => {
  await fetchWithAuth(`${ACCOUNTS_URL}/${accountId}`, { method: 'DELETE' });
};

const generatePassword = async (): Promise<string> => {
  const response = await fetchWithAuth(`${API_URL}/generatepassword`, {
    method: 'GET',
  });

  return response.json().then((data) => data.password);
};

const accountService = {
  getAccounts,
  getAccount,
  addAccount,
  editAccount,
  deleteAccount,
  generatePassword,
};

export default accountService;
