import axios from "axios";

export const client = axios.create({
  // baseURL: "https://api.illumina-me.org",
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export type User = {
  username: string;
  email: string;
  image: string;
};

export type Article = {
  id: string;
  user: string;
  title: string;
  banner: string;
  content: string;
  public: boolean;
  created_at: Date;
};
