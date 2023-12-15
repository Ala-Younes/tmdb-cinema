import { useState } from "react";
import { Card, Carousel, Spinner } from "../components";
import useFetch from "../hooks/useFetch";
import { Movie } from "../models/Movie";
import PageNotFoundImage from "../assets/avatar.jpg";

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
  });

  const handleFilteredMovies = (filteredMovies: Movie[]) => {
    console.log("filteredMovies", filteredMovies);

    setFilteredMovies(filteredMovies);
    setShowFiltered(true);
  };

  const displayedMovies = showFiltered ? filteredMovies : movies;

  if (error) return <div>Something went wrong ...</div>;
  if (loading) return <Spinner />;

  return (
    <>
      <Carousel onFilterMovies={handleFilteredMovies} />
      <main>
        <section className="py-7">
          <div
            className={`${
              displayedMovies.length > 0 ? "grid" : ""
            } lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-3`}
          >
            {displayedMovies.length > 0 ? (
              displayedMovies?.map((movie) => (
                <Card key={movie?.id} movie={movie} />
              ))
            ) : (
              <section className="flex flex-col justify-center px-2">
                <div className="flex flex-col items-center my-4">
                  <p className="text-7xl text-gray-700 font-bold my-10 dark:text-white">
                    404, Oops!
                  </p>
                  <div className="max-w-lg">
                    <img
                      className="rounded"
                      src={PageNotFoundImage}
                      alt="404 Page Not Found"
                    />
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default MovieList;
