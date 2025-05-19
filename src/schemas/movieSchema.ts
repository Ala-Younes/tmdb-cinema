import { z } from 'zod';

// Base Movie Schema
export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()).optional(),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

// Movie Detail Schema extends the base Movie Schema
export const movieDetailSchema = movieSchema.extend({
  belongs_to_collection: z.null().optional(),
  budget: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  homepage: z.string().nullable(),
  imdb_id: z.string().nullable(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    })
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    })
  ),
  revenue: z.number(),
  runtime: z.number().nullable(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
  status: z.string(),
  tagline: z.string().nullable(),
});

// Movie Search Results Schema
export const movieSearchResultsSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

// Types inferred from the schemas
export type Movie = z.infer<typeof movieSchema>;
export type MovieDetail = z.infer<typeof movieDetailSchema>;
export type MovieSearchResults = z.infer<typeof movieSearchResultsSchema>;