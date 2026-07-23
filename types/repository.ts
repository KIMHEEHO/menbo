export type Repository = {
  name: string;
  description: string | null;
  pushedAt: string;
  startgazerCount: number;
  url: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
};
