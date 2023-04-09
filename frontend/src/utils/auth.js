import { redirect } from "react-router-dom";

/**
 * It gets the expiration date of the token from local storage, subtracts the current time from it, and
 * returns the difference
 * @returns The time difference between the current time and the time the token expires.
 */
export function getTokenDuration() {
  const storedTokenDuration = localStorage.getItem("expiration-learn");
  const expireDuration = new Date(storedTokenDuration);
  const nowTime = new Date();
  const duration = expireDuration.getTime() - nowTime.getTime();
  return duration;
}

/**
 * It gets the token from local storage and returns it
 * @returns The token from local storage.
 */
export const getTokenData = () => {
  const token = localStorage.getItem("token-learn");

  if (!token) return null;

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) return "EXPIRED";

  return token;
};

/**
 * It returns the token data if it exists, otherwise it returns false
 * @returns The token data.
 */
export const loaderAuth = () => {
  return getTokenData();
};

/**
 * If there's no token, redirect to the auth page
 * @returns null
 */
export function checkAuthLoader() {
  // this function will be added in the next lecture
  // make sure it looks like this in the end
  const token = getTokenData();

  if (!token) {
    return redirect("/auth");
  }

  return null; // this is missing in the next lecture video and should be added by you
}
