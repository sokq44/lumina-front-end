import axios from "axios";

export const client = axios.create({
  // prod
  // baseURL: "https://api.illumina-me.org",

  // dev
  baseURL: "http://localhost:3000",

  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export type Profile = {
  bio: string;
  email: string;
  image: string;
  username: string;
  favourites: string;
  created_at: Date;
  articles_count: number;
  words_count: number;
  reads_count: number;
  avg_rating: number;
  book: {
    title: string;
    description: string;
    cover_url: string;
  };
  socials: {
    type: string;
    label: string;
    value: string;
  };
};

export type User = {
  id?: string;
};

export type Article = {
  id: string;
  user: string;
  title: string;
  banner: string;
  content: string;
  public: boolean;
  created_at: Date;
  user_image: string;
  reads: number;
  comments: number;
  ratings: number[];
  my_rating: number;
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  created_at: Date;
  last_modified: Date;
};
