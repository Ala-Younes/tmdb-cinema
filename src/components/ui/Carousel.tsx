import { Spinner } from "../index";
import useFetch from "../../hooks/useFetch";
import { Movie } from "../../models/Movie";
import { useCallback, useEffect, useState } from "react";
import getTopMoviesImages from "../../utils/getTopMovies";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  onFilterMovies: (filteredMovies: Movie[]) => void;
};

const Carousel = ({ onFilterMovies }: Props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchMovie, setSearchMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const navigate = useNavigate();

  const {
    data: movies,
    error,
    loading,
  } = useFetch<Movie[]>({
    apiVariant: "/now_playing",
    initialValue: [],
  });

  const topSlides = getTopMoviesImages(4, movies);

  const handlePreviousSlideClick = () => {
    const isFirstSlide = currentSlideIndex === 0;
    const newSlideIndex = isFirstSlide
      ? topSlides.length - 1
      : currentSlideIndex - 1;
    setCurrentSlideIndex(newSlideIndex);
  };

  const handleNextSlideClick = useCallback(() => {
    const isLastSlide = currentSlideIndex === topSlides.length - 1;
    const newSlideIndex = isLastSlide ? 0 : currentSlideIndex + 1;
    setCurrentSlideIndex(newSlideIndex);
  }, [currentSlideIndex, topSlides.length, setCurrentSlideIndex]);

  const handleGoToSlideClick = (slideIndex: number) => {
    setCurrentSlideIndex(slideIndex);
  };

  const handleSearchMovie: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const searchedValue = e.target.value.toLowerCase();
    setSearchMovie(searchedValue);

    // ! All logic based on searchedValue so normally we have to check it
    const filtered = searchedValue
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchedValue)
        )
      : movies;
    console.log("e.target.value", e.target.value);

    onFilterMovies(filtered);
    setFilteredMovies(filteredMovies);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextSlideClick();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlideIndex, handleNextSlideClick]);

  if (error) return <div>Something went wrong ...</div>;
  if (loading) return <Spinner />;

  const renderSlideIndicator = (slideIndex: number) => (
    <button
      onClick={() => handleGoToSlideClick(slideIndex)}
      key={slideIndex}
      type="button"
      className={`${
        currentSlideIndex === slideIndex
          ? "w-5 h-5 bg-red-500"
          : "w-5 h-5 bg-black"
      } rounded-full`}
      aria-current="true"
      aria-label={`Slide ${slideIndex + 1}`}
    ></button>
  );

  const renderSlideContent = () => {
    return (
      <div className="absolute z-30 flex flex-col top-40 md:top-44 lg:top-52 mx-auto text-center py-24">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white">
          We invest in the movies potential
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Here at Cinamate we focus on markets where movies, series, and anime
          can unlock long-term value and drive creative growth.
        </p>
        <div className="flex justify-center">
          <form className="flex flex-col w-2/3">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                value={searchMovie}
                onChange={handleSearchMovie}
                name="search"
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search In This List Of Movies ..."
                required
              />
            </div>
          </form>

          <Link
            to={`/movie/${topSlides[currentSlideIndex].movieID}`}
            className="hidden md:inline-flex  justify-center hover:text-gray-900 items-center py-3 px-5 ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Learn more
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
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 max-w-7xl mx-auto">
      {/* Carousel */}
      <div className="relative bg-white dark:bg-slate-800">
        {/* background Image */}
        <img
          className="rounded-3xl w-full h-[600px] bg-center bg-cover object-cover opacity-80 animate-fade"
          src={`${topSlides[currentSlideIndex].moviePosterPath}`}
          alt={`alt`}
        />
        {/* Content */}
        {renderSlideContent()}
        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {topSlides.map((_, slideIndex) => renderSlideIndicator(slideIndex))}
        </div>

        <div className="md:hidden absolute top-0 right-0 p-4 flex items-center justify-center">
          <button
            onClick={() =>
              navigate(`/movie/${topSlides[currentSlideIndex].movieID}`)
            }
            className="ring-2 ring-white dark:ring-black rounded-full p-2"
          >
            <svg
              className="w-6 h-6 dark:text-gray-800 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
              <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
            </svg>
          </button>
        </div>
        {/* Slider controls */}
        {["Previous", "Next"].map((direction, index) => (
          <button
            key={index}
            onClick={
              direction === "Previous"
                ? handlePreviousSlideClick
                : handleNextSlideClick
            }
            type="button"
            className={`absolute top-0 ${
              index === 0 ? "start-0" : "end-0"
            } z-30 flex items-center justify-center top-1/2 px-4 cursor-pointer group focus:outline-none`}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-6 h-6 text-white dark:text-gray-900 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={index === 0 ? "M5 1 1 5l4 4" : "m1 9 4-4-4-4"}
                />
              </svg>
              <span className="sr-only">{direction}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
