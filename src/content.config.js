import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const sheets = defineCollection({
  loader: glob({ base: "./src/content/sheets", pattern: "*.md" }),
});

export const collections = { sheets };
