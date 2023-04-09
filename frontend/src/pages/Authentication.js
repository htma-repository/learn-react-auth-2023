import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const actionAuth = async ({ request }) => {
  /* Getting the mode from the url. */
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  /* Checking if the mode is not login or signup, then it will throw an error. */
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "mode error" }, { status: 422 });
  }

  /* Getting the data from the form. */
  const authFormData = await request.formData();
  const authData = {
    email: authFormData.get("email"),
    password: authFormData.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  /* Checking if the response status is 422 or 401, if it is, then it will return the response. */
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  /* Checking if the response is not ok, then it will throw an error. */
  if (!response.ok) {
    throw json({ message: "Could not auth user." }, { status: 500 });
  }

  /* Saving the token in the local storage. */
  const data = await response.json();
  const token = data.token;

  /* Setting the expiration date for the token. */
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  /* Saving the token in the local storage. */
  localStorage.setItem("token-learn", token);
  localStorage.setItem("expiration-learn", expiration.toISOString());

  return redirect("/");
};
