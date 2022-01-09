export type loginForm = {
  username: string;
  password: string;
};

export const apiUrl = process.env.NODE_ENV !== "production" ? "http" : "https";
