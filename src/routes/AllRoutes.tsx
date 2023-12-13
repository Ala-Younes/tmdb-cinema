import { Route, Routes } from "react-router-dom";
import { MovieDetail, MovieList, PageNotFound } from "../pages";

const AllRoutes = () => {
  return (
    <div className="dark:bg-slate-800 w-full">
      <Routes>
        <Route
          path="/"
          element={<MovieList apiVariant="/now_playing" />}
        ></Route>

        <Route path="movie/:id" element={<MovieDetail />}></Route>

        <Route
          path="movies/popular"
          element={<MovieList apiVariant="/popular" />}
        ></Route>

        <Route
          path="movies/top"
          element={<MovieList apiVariant="/top_rated" />}
        ></Route>

        <Route
          path="movies/upcoming"
          element={<MovieList apiVariant="/upcoming" />}
        ></Route>

        <Route path="search" element={<MovieList />}></Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
