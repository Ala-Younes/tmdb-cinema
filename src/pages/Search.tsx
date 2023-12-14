import { useSearchParams } from "react-router-dom";
import { Card, Spinner } from "../components";
import useFetch from "../hooks/useFetch";
import { Movie } from "../models/Movie";

type Props = {
  apiVariant?: string;
};

const Search = ({ apiVariant }: Props) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");

  const {
    data: movies,
    loading,
    error,
  } = useFetch<Movie[]>({
    apiVariant: apiVariant || "",
    initialValue: [],
    queryTerm: queryTerm ? queryTerm : "",
  });

  if (error)
    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">Danger alert!</span> Change a few things
        up and try submitting again.
      </div>
    );
  if (loading) return <Spinner />;

  return (
    <main>
      <section className="py-7">
        <p className="text-3xl text-gray-700 dark:text-white">
          {movies.length !== 0
            ? `Result for : ${queryTerm}`
            : `No Result Found for ${queryTerm}`}
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
