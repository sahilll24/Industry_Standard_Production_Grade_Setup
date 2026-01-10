import { API_BASE_URL } from "../config";

export const apiRequest = async (
  path,
  { method = "GET", body, token, signal } = {}
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.message || `Request failed: ${response.status} ${response.statusText}`;
    const error = new Error(message);
    error.status = response.status;
    error.url = url;
    console.error(`API Error [${response.status}]:`, url, data);
    throw error;
  }

  return data;
};


