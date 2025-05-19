import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_BASE_URL: z.string().url(),
    VITE_TMDB_API_KEY: z.string().min(1),
    VITE_IMAGE_BASE_URL: z.string().url().default("https://image.tmdb.org/t/p/w500"),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});