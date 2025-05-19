// Using Zod for data validation
import { Movie, MovieDetail, movieSchema, movieDetailSchema, movieSearchResultsSchema } from '../schemas/movieSchema';

// Re-export the types and schemas
export type { Movie, MovieDetail };
export { movieSchema, movieDetailSchema, movieSearchResultsSchema };
