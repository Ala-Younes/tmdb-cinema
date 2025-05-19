import { useCallback, useEffect, useState } from "react";
import { env } from "../env";
import { z } from "zod";
import { toast } from "react-toastify";
import { mockMovies, mockMovieDetails } from "../mocks/movieData";

type Props<T> = {
  apiVariant?: string;
  initialValue: T;
  queryTerm?: string;
  movieID?: string;
  schema?: z.ZodType<any>;
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

function useFetch<T>({
  apiVariant,
  initialValue,
  queryTerm,
  movieID,
  schema,
}: Props<T>) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const url = buildUrl({
    apiVariant,
    queryTerm,
    movieID,
  });

  const fetchData = useCallback(() => {
    setError(null);
    setLoading(true);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      try {
        // Use mock data instead of real API
        let mockData;
        
        if (movieID) {
          // For movie details
          mockData = mockMovieDetails;
        } else if (queryTerm) {
          // For search results
          const searchTerm = (queryTerm || '').toLowerCase();
          const filteredMovies = mockMovies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) || 
            movie.original_title.toLowerCase().includes(searchTerm)
          );
          
          console.log(`Search term: "${searchTerm}", Found: ${filteredMovies.length} movies`);
          mockData = filteredMovies;
        } else {
          // For movie lists (popular, top rated, etc.)
          mockData = mockMovies;
        }
        
        // Process the data, with or without validation
        try {
          if (schema) {
            // If schema exists, validate the data with Zod
            const validatedData = schema.parse(mockData);
            setData(validatedData as T);
          } else {
            // If no schema is provided, just use the data as is
            setData(mockData as T);
          }
        } catch (validationError) {
          console.error("Validation error:", validationError);
          if (validationError instanceof z.ZodError) {
            toast.error("Data validation failed. Some features may not work correctly.");
            // Still set the data even if validation fails
            setData(mockData as T);
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
    }, 800); // 800ms delay to simulate network
    
    return () => clearTimeout(timer);
  }, [movieID, queryTerm, schema]);

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup;
  }, [fetchData]);

  return { data, loading, error };
}

export default useFetch;