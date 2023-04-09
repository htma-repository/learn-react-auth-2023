import { redirect } from "react-router-dom";

/**
 * It removes the token and expiration from localStorage and redirects the user to the home page
 * @returns The logoutAction function is being returned.
 */
export const logoutAction = () => {
  localStorage.removeItem("token-learn");
  localStorage.removeItem("expiration-learn");
  return redirect("/");
};
