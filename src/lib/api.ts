import { useAuth } from './auth';

const API_URL = 'https://api.smartlearner.com'; // Replace with your actual API URL

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const { token } = useAuth.getState();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      return fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
    register: async (data: {
      email: string;
      password: string;
      name: string;
      role: string;
    }) => {
      return fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    forgotPassword: async (email: string) => {
      return fetchWithAuth('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },
  },
};