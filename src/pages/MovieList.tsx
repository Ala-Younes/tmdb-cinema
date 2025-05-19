import { useState } from "react";
import { Card, Carousel, Spinner } from "../components";
import useFetch from "../hooks/useFetch";
import { Movie, movieSchema } from "../schemas/movieSchema";
import PageNotFoundImage from "../assets/avatar.jpg";
import { motion } from "framer-motion";

type Props = {
  apiVariant?: string;
};

const MovieList = ({ apiVariant }: Props) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [showFiltered, setShowFiltered] = useState<boolean>(false);

  const {
    data: movies,
    error,
    loading,
  } = useFetch<Movie[]>({
    apiVariant: apiVariant || "",
    initialValue: [],
    schema: movieSchema.array(),
  });

  const handleFilteredMovies = (filteredMovies: Movie[]) => {
    setFilteredMovies(filteredMovies);
    setShowFiltered(true);
  };

  const handleResetFilter = () => {
    setShowFiltered(false);
  };

  const displayedMovies = showFiltered ? filteredMovies : movies;

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-red-500 text-xl font-semibold mb-4">
        Something went wrong while fetching movies
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
  );
  
  if (loading) return <Spinner />;

  return (
    <>
      <Carousel onFilterMovies={handleFilteredMovies} />
      
      <main className="container mx-auto px-4 py-8">
        {showFiltered && (
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Filtered Results ({filteredMovies.length})
            </h2>
            <button
              onClick={handleResetFilter}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Show All Movies
            </button>
          </div>
        )}
        
        <motion.section 
          className="py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: movie.id % 10 * 0.05 }}
                >
                  <Card movie={movie} />
                </motion.div>
              ))}
            </div>
          ) : (
            <section className="flex flex-col justify-center items-center px-2 min-h-[50vh]">
              <div className="flex flex-col items-center my-4 text-center">
                <motion.p 
                  className="text-5xl md:text-7xl text-gray-700 font-bold my-6 dark:text-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  No Movies Found
                </motion.p>
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Try adjusting your filters or search criteria
                </motion.p>
                <motion.div 
                  className="max-w-md rounded-lg overflow-hidden shadow-lg"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <img
                    className="w-full"
                    src={PageNotFoundImage}
                    alt="No Movies Found"
                  />
                </motion.div>
              </div>
            </section>
          )}
        </motion.section>
      </main>
    </>
  );
};

export default MovieList;
