import { useSearchParams } from "react-router-dom";
import { Card } from "../components";
import useFetch from "../hooks/useFetch";
import { Movie } from "../models/Movie";

type Props = {
  apiVariant?: string;
};

const Search = ({ apiVariant }: Props) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");

  const { data: movies } = useFetch<Movie[]>({
    apiVariant: apiVariant || "",
    initialValue: [],
    queryTerm: queryTerm ? queryTerm : "",
  });

  return (
    <main>
      <section className="py-7">
        <p className="text-3xl text-gray-700 dark:text-white">
          {movies.length === 0
            ? `No Result Found for ${queryTerm}`
            : `Result for : ${queryTerm}`}
        </p>
      </section>
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

export default Search;
