export type Project = {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  featured?: boolean;
  tags: string[];
  links?: { demo?: string; repo?: string };
  tech?: string[];
  timeline?: string;
  location?: string;
};

export const PROJECTS: Project[] = [];
