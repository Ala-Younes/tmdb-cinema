import { useParams } from "react-router-dom";
import Backup from "../assets/avatar.jpg";
import { IMovieDetail } from "../models/Movie";
import formatCurrency from "../utils/formatCurrency";
import useFetch from "../hooks/useFetch";
import { Spinner } from "../components";

const MovieDetail = () => {
  const params = useParams();

  const {
    data: movie,
    error,
    loading,
  } = useFetch<IMovieDetail>({
    initialValue: {} as IMovieDetail,
    movieID: params.id,
  });
  if (error) return <div>Something went wrong ...</div>;
  if (loading) return <Spinner />;

  const image = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : Backup;

  return (
    <main>
      <section className="flex justify-around flex-wrap py-5 gap-4">
        <div className="max-w-sm">
          <img className="rounded" src={image} alt={movie?.title} />
        </div>
        <div className="flex flex-col items-center md:items-start max-w-2xl text-gray-700 text-lg dark:text-white">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">
            {movie?.title}
          </h1>
          <p className="my-4 text-center md:text-left">{movie?.overview}</p>
          {movie?.genres ? (
            <p className="my-7 flex flex-wrap gap-2">
              {movie?.genres.map((genre) => (
                <span
                  className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
            </p>
          ) : (
            ""
          )}

          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Rating star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <p className="ml-2 text-gray-900 dark:text-white">
              {movie?.vote_average}
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <span className="text-gray-900 dark:text-white">
              {movie?.vote_count} reviews
            </span>
          </div>

          <p className="my-4">
            <span className="mr-2 font-bold">Runtime:</span>
            <span>{movie?.runtime} min.</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Budget:</span>
            <span>{formatCurrency(movie?.budget)}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Revenue:</span>
            <span>{formatCurrency(movie?.revenue)}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Release Date:</span>
            <span>{movie?.release_date}</span>
          </p>

          <p className="my-4">
            <a
              href={`https://www.imdb.com/title/${movie?.imdb_id}`}
              target="_blank"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
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
          </p>
        </div>
      </section>
    </main>
  );
};

export default MovieDetail;
