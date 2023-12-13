import { useCallback, useEffect, useState } from "react";
import { BASE_URL, TMDB_API_KEY } from "../utils/getEnvVars";

type Props<T> = {
  apiVariant?: string;
  initialValue: T;
  queryTerm?: string;
  movieID?: string;
};

// type BuildUrlProps<T> = Omit<Props<T>, "initialValue">;
type BuildUrlProps<T> = Pick<Props<T>, "apiVariant" | "queryTerm" | "movieID">;

// TODO a lib or a hook to check types of env vars

function buildUrl<T>({ apiVariant, queryTerm, movieID }: BuildUrlProps<T>) {
  const baseEndpoint = `${BASE_URL}/${
    movieID ? `movie/${movieID}` : queryTerm ? "search" : "movie"
  }${apiVariant || ""}`;

  const queryString = `api_key=${TMDB_API_KEY}${
    queryTerm ? `&query=${queryTerm}` : ""
  }`;

  return `${baseEndpoint}?${queryString}`;
}

function useFetch<T>({
  apiVariant,
  initialValue,
  queryTerm,
  movieID,
}: Props<T>) {
  const [data, setData] = useState<T>(initialValue);

  const url = buildUrl({
    apiVariant,
    queryTerm,
    movieID,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      movieID ? setData(json) : setData(json.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [movieID, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data };
}

export default useFetch;
