import { useCallback, useEffect, useState } from "react";
import { env } from "../env";
import { z } from "zod";
import { toast } from "react-toastify";

type Props<T, S extends z.ZodType<T> | undefined = undefined> = {
  apiVariant?: string;
  initialValue: T;
  queryTerm?: string;
  movieID?: string;
  schema?: S;
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

function useFetch<T, S extends z.ZodType<T> | undefined = undefined>({
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
      
      // Process the data, with or without validation
      try {
        if (schema) {
          // If schema exists, validate the data with Zod
          let validatedData;
          if (movieID) {
            validatedData = schema.parse(json);
          } else {
            // Handle search results which have a results property
            validatedData = json.results ? schema.parse(json.results) : schema.parse(json);
          }
          setData(validatedData as T);
        } else {
          // If no schema is provided, just use the data as is
          if (movieID) {
            setData(json as T);
          } else {
            setData((json.results || json) as T);
          }
        }
      } catch (validationError) {
        console.error("Validation error:", validationError);
        if (validationError instanceof z.ZodError) {
          toast.error("Data validation failed. Some features may not work correctly.");
          // Still set the data even if validation fails
          if (movieID) {
            setData(json as T);
          } else {
            setData((json.results || json) as T);
          }
        } else {
          throw validationError;
        }
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
