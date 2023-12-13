// TODO use a 3rd party lib to manipulate .env vars
const BASE_URL = import.meta.env.VITE_BASE_URL;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export { BASE_URL, TMDB_API_KEY };
