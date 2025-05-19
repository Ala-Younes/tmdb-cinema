import { useCallback, useEffect, useState } from "react";
import { env } from "../env";
import { z } from "zod";
import { toast } from "react-toastify";

type Props<T, S extends z.ZodType<T>> = {
  apiVariant?: string;
  initialValue: T;
  queryTerm?: string;
  movieID?: string;
  schema: S;
};

type BuildUrlProps = {
  apiVariant?: string;
  queryTerm?: string;
  movieID?: string;
};

function buildUrl({ apiVariant, queryTerm, movieID }: BuildUrlProps) {
  const baseEndpoint = `${env.VITE_BASE_URL}/${
    movieID ? `movie/${movieID}` : queryTerm ? "search/movie" : "movie"
  }${apiVariant || ""}`;

  const queryString = `api_key=${env.VITE_TMDB_API_KEY}${
    queryTerm ? `&query=${queryTerm}` : ""
  }`;

  return `${baseEndpoint}?${queryString}`;
}

function useFetch<T, S extends z.ZodType<T>>({
  apiVariant,
  initialValue,
  queryTerm,
  movieID,
  schema,
}: Props<T, S>) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const url = buildUrl({
    apiVariant,
    queryTerm,
    movieID,
  });

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      
      const json = await response.json();
      
      // Validate the data with Zod
      try {
        const validatedData = movieID 
          ? schema.parse(json) 
          : schema.parse(json.results);
        
        setData(validatedData as T);
      } catch (validationError) {
        console.error("Validation error:", validationError);
        if (validationError instanceof z.ZodError) {
          toast.error("Data validation failed. Some features may not work correctly.");
        }
        throw validationError;
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      toast.error("Failed to fetch data. Please try again later.");
    }
  }, [movieID, url, schema]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}

export default useFetch;
