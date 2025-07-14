import axios from "axios";

export const client = axios.create({
  // prod
  baseURL: "https://api.illumina-me.org",

  // dev
  // baseURL: "http://localhost:3000",

  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export type User = {
  id?: string;
  email: string;
  image: string;
  username: string;
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
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  created_at: Date;
  last_modified: Date;
};
