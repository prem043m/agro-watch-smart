const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
const API_BASE_URL = `${API_BASE}/api`;
const API_KEY = import.meta.env.VITE_API_KEY;
const headers = (json=true) => ({
  ...(json ? {'Content-Type':'application/json'} : {}),
  ...(API_KEY ? {'x-api-key': API_KEY} : {})
});