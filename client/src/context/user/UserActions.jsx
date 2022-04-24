import axios from "axios";
import Cookie from "js-cookie";

const cookie = Cookie.get("jwt");

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { Authorization: `Bearer ${cookie}` },
  withCredentials: true,
});

// Log in user

export const signInUser = async (email, password) => {
  const response = await api.post("/users/signin", { email, password });
  return response.data;
};
