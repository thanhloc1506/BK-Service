export type LoginForm = {
  username: string;
  password: string;
};

export type RegisterForm = {
  username: string;
  password: string;
  comfirmPassword: string;
  email: string;
};

export const apiUrl =
  process.env.NODE_ENV !== "production" ? "http://localhost:3007/api" : "https";
