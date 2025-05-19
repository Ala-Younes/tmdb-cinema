import { useParams } from "react-router-dom";
import Backup from "../assets/avatar.jpg";
import { MovieDetail as MovieDetailType, movieDetailSchema } from "../models/Movie";
import formatCurrency from "../utils/formatCurrency";
import useFetch from "../hooks/useFetch";
import { Spinner } from "../components";
import { motion } from "framer-motion";
import { StarIcon, ClockIcon, CurrencyDollarIcon, CalendarIcon, LinkIcon } from "@heroicons/react/24/solid";
import { env } from "../env";

const MovieDetail = () => {
  const params = useParams();

  const {
    data: movie,
    error,
    loading,
  } = useFetch<MovieDetailType, typeof movieDetailSchema>({
    initialValue: {} as MovieDetailType,
    movieID: params.id,
    schema: movieDetailSchema,
  });

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-red-500 text-xl font-semibold mb-4">
        Something went wrong while fetching movie details
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

  const image = movie?.poster_path
    ? `${env.VITE_IMAGE_BASE_URL}${movie.poster_path}`
    : Backup;
    
  // Format release date
  const formattedDate = new Date(movie?.release_date || "").toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.section 
        className="flex flex-col md:flex-row justify-between gap-8 py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="md:w-1/3 lg:w-1/4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="sticky top-24">
            <img 
              className="rounded-lg shadow-lg w-full object-cover" 
              src={image} 
              alt={movie?.title} 
            />
            
            {movie?.tagline && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg italic text-center">
                "{movie.tagline}"
              </div>
            )}
            
            {movie?.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
              >
                <LinkIcon className="w-5 h-5 mr-2" />
                Official Website
              </a>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="md:w-2/3 lg:w-3/4 flex flex-col text-gray-700 text-lg dark:text-white"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              {movie?.title}
              {movie?.release_date && (
                <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              )}
            </h1>
            
            <div className="flex items-center mt-2 md:mt-0">
              <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-2 rounded-lg">
                <StarIcon className="w-6 h-6 text-yellow-500 mr-1" />
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {movie?.vote_average?.toFixed(1)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  /10
                </span>
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                ({movie?.vote_count?.toLocaleString()} votes)
              </span>
            </div>
          </div>
          
          {movie?.genres && movie.genres.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {movie?.runtime && (
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium">Runtime:</span>
                <span className="ml-2">{movie.runtime} minutes</span>
              </div>
            )}
            
            {movie?.release_date && (
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium">Release Date:</span>
                <span className="ml-2">{formattedDate}</span>
              </div>
            )}
            
            {movie?.budget > 0 && (
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium">Budget:</span>
                <span className="ml-2">{formatCurrency(movie.budget)}</span>
              </div>
            )}
            
            {movie?.revenue > 0 && (
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium">Revenue:</span>
                <span className="ml-2">{formatCurrency(movie.revenue)}</span>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">Overview</h2>
            <p className="text-base leading-relaxed">{movie?.overview}</p>
          </div>
          
          {movie?.production_companies && movie.production_companies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">Production Companies</h2>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center">
                    <span className="text-base">{company.name}</span>
                    {company.origin_country && (
                      <span className="ml-1 text-sm text-gray-500">({company.origin_country})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {movie?.imdb_id && (
            <div className="mt-6">
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 transition-colors"
              >
                View on IMDb
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          )}
        </motion.div>
      </motion.section>
    </main>
  );
};

export default MovieDetail;
