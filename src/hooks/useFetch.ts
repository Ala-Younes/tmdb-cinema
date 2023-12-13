import { useCallback, useEffect, useState } from "react";

type Props<T> = {
  apiVariant: string;
  initialValue: T;
  queryTerm?: string | undefined;
};

// type BuildUrlProps<T> = Omit<Props<T>, "initialValue">;
type BuildUrlProps<T> = Pick<Props<T>, "apiVariant" | "queryTerm">;

// TODO a lib or a hook to check types of env vars
const BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function buildUrl<T>({ apiVariant, queryTerm }: BuildUrlProps<T>) {
  const baseEndpoint = `${BASE_URL}/${
    queryTerm ? "search" : "movie"
  }${apiVariant}`;

  const queryString = `api_key=${VITE_TMDB_API_KEY}${
    queryTerm ? `&query=${queryTerm}` : ""
  }`;
  return `${baseEndpoint}?${queryString}`;
}

function useFetch<T>({ apiVariant, initialValue, queryTerm }: Props<T>) {
  const [data, setData] = useState<T>(initialValue);

  const url = buildUrl({
    apiVariant,
    queryTerm,
  });

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
