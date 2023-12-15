import { Spinner } from "../index";
import useFetch from "../../hooks/useFetch";
import { Movie } from "../../models/Movie";
import { useCallback, useEffect, useState } from "react";
import getTopMoviesImages from "../../utils/getTopMovies";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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

  return (
    <div className="py-6 max-w-7xl mx-auto">
      <div className="relative">
        <Link to={`/movie/${topSlides[currentSlideIndex]?.movieID}`}>
          <img
            className="rounded-3xl w-full h-[600px] bg-center bg-cover object-cover duration-500"
            src={`${topSlides[currentSlideIndex].moviePosterPath}`}
            alt={`alt`}
          />
        </Link>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {topSlides.map((_, slideIndex) => renderSlideIndicator(slideIndex))}
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
            } z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`}
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
