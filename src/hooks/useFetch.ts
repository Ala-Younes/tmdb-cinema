import { useCallback, useEffect, useState } from "react";

type Props<T> = {
  apiVariant: string;
  initialValue: T;
  queryTerm?: string;
};
// TODO a lib or a hook to check types of env vars
const BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function useFetch<T>({ apiVariant, initialValue, queryTerm }: Props<T>) {
  const [data, setData] = useState<T>(initialValue);

  const url = queryTerm
    ? `${BASE_URL}/search${apiVariant}?api_key=${VITE_TMDB_API_KEY}&query=${queryTerm}`
    : `${BASE_URL}/movie${apiVariant}?api_key=${VITE_TMDB_API_KEY}`;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data };
}

export default useFetch;
