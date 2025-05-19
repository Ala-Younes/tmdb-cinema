import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Spinner } from "../components";
import useFetch from "../hooks/useFetch";
import { Movie, movieSchema } from "../schemas/movieSchema";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  apiVariant?: string;
};

const Search = ({ apiVariant }: Props) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    data: movies,
    loading,
    error,
  } = useFetch<Movie[]>({
    apiVariant: apiVariant || "",
    initialValue: [],
    queryTerm: queryTerm ? queryTerm : "",
    schema: movieSchema.array(),
  });

  // Set initial load to false after first load
  useEffect(() => {
    if (!loading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [loading, isInitialLoad]);

  // Log search results for debugging
  useEffect(() => {
    if (!loading && !isInitialLoad) {
      console.log(`Search results for "${queryTerm}":`, movies);
    }
  }, [movies, loading, queryTerm, isInitialLoad]);

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="text-red-500 text-xl font-semibold mb-4">
          Something went wrong while searching for movies
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error.message || "Please try again later"}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (loading) return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh] flex flex-col items-center justify-center">
      <Spinner />
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
        Searching for "{queryTerm}"...
      </p>
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.section 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {movies.length > 0 ? (
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Search Results
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Found <span className="font-semibold">{movies.length}</span> results for: 
              <span className="ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                "{queryTerm}"
              </span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              No Results Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We couldn't find any movies matching "{queryTerm}"
            </p>
            <div className="max-w-md text-gray-600 dark:text-gray-400">
              <p className="mb-2">Suggestions:</p>
              <ul className="list-disc list-inside">
                <li>Check your spelling</li>
                <li>Try using different keywords</li>
                <li>Try searching for a movie title</li>
                <li>Use more general terms</li>
              </ul>
            </div>
          </div>
        )}
      </motion.section>
      
      {movies.length > 0 && (
        <motion.section 
          className="py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index % 8 * 0.05 }}
              >
                <Card movie={movie} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </main>
  );
};

export default Search;
