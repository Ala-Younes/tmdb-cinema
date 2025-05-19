import { Link } from "react-router-dom";
import backUpImage from "../../assets/avatar.jpg";
import { Movie } from "../../models/Movie";
import { motion } from "framer-motion";
import { env } from "../../env";
import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
  movie: Movie;
};

const Card = ({ movie }: Props) => {
  const { id, original_title, overview, poster_path, vote_average, release_date } = movie;
  const imageUrl = poster_path
    ? `${env.VITE_IMAGE_BASE_URL}${poster_path}`
    : backUpImage;
    
  // Format release date
  const formattedDate = new Date(release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Truncate overview if it's too long
  const truncatedOverview = overview.length > 150 
    ? `${overview.substring(0, 150)}...` 
    : overview;

  return (
    <motion.div 
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden h-full flex flex-col"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/movie/${id}`} className="overflow-hidden">
        <motion.div 
          className="overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            loading="lazy"
            className="w-full h-64 object-cover transition-transform duration-300"
            src={imageUrl}
            alt={original_title}
          />
        </motion.div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/movie/${id}`} className="flex-grow">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {original_title}
            </h5>
          </Link>
          <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-lg ml-2">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {formattedDate}
        </p>
        
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300 flex-grow">
          {truncatedOverview}
        </p>
        
        <Link 
          to={`/movie/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors"
        >
          View Details
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
