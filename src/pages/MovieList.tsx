import { Card } from "../components";
import Movie from "../models/Movie";
import useFetch from "../hooks/useFetch";

type Props = {
  apiVariant?: string;
};
const MovieList = ({ apiVariant }: Props) => {
  const { data: movies } = useFetch<Movie[]>({
    apiVariant: apiVariant || "",
    initialValue: [],
  });

  return (
    <main>
      <section className="py-7">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-3">
          {movies?.map((movie) => (
            <Card key={movie?.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MovieList;
