import { Movie } from "../models/Movie";
import backUpImage from "../assets/avatar.jpg";

interface TopMovieImage {
  movieID: number;
  moviePosterPath: string;
}

const getTopMoviesImages = (
  numberOfMovies: number,
  movies: Movie[]
): TopMovieImage[] => {
  const topMovieImages: TopMovieImage[] = [];

  for (let i = 0; i < numberOfMovies && i < movies.length; i++) {
    const movie = movies[i];
    const topMovieImage: TopMovieImage = {
      movieID: movie?.id || 466420,
      moviePosterPath: movie?.poster_path
        ? `https://image.tmdb.org/t/p/w1280${movie?.poster_path}`
        : backUpImage,
    };

    topMovieImages.push(topMovieImage);
  }

  return topMovieImages;
};

export default getTopMoviesImages;
