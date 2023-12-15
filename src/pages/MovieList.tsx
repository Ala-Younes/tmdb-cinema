import { Card, Carousel, Spinner } from "../components";
import useFetch from "../hooks/useFetch";
import { Movie } from "../models/Movie";

type Props = {
  apiVariant?: string;
};
const MovieList = ({ apiVariant }: Props) => {
  const {
    data: movies,
    error,
    loading,
  } = useFetch<Movie[]>({
    apiVariant: apiVariant || "",
    initialValue: [],
  });

  if (error) return <div>Something went wrong ...</div>;
  if (loading) return <Spinner />;

  return (
    <>
      <Carousel />
      <main>
        <section className="py-7">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-3">
            {movies?.map((movie) => (
              <Card key={movie?.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default MovieList;
