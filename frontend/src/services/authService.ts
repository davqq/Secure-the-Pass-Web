import { User } from '../types/User';

const API_URL = import.meta.env.VITE_API_URL;

async function login(email: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Email: email, Password: password }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Login fehlgeschlagen');
  }

  return response.json();
}

const logout = async () => {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

const checkSession = async (): Promise<Response> => {
  return await fetch(`${API_URL}/auth/check-session`, {
    method: 'GET',
    credentials: 'include',
  });
};

const AuthService = { login, logout, checkSession };

export default AuthService;
