export type Frontmatter = {
  metaTitle: string;
  metaDescription?: string;
  publishedAt?: string;
  metaImage?: string;
  features?: string[];
  version?: string;
  versions?: string[];
  aria?: string;
  name?: string;
  publishedName?: string;
  slug: string;
  by?: 'colm' | 'stephen' | 'pedro';
  readingTime?: { text: string; minutes: number; time: number; words: number };
};
