import { useCallback, useEffect, useState } from "react";

type Props<T> = {
  apiVariant: string;
  initialValue: T;
};
// TODO a lib or a hook to check types of env vars
const BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function useFetch<T>({ apiVariant, initialValue }: Props<T>) {
  const [data, setData] = useState<T>(initialValue);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `${BASE_URL}/${apiVariant}?api_key=${VITE_TMDB_API_KEY}`
    );
    const json = await response.json();
    setData(json.results);
  }, [apiVariant]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data };
}

export default useFetch;
