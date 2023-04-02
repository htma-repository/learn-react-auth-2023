import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const actionAuth = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "mode error" }, { status: 422 });
  }

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

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not auth user." }, { status: 500 });
  }

  return redirect("/");
  // const data = await response.json();
  // console.log(data);

  // localStorage.setItem("token", data.token);
  // localStorage.setItem("user", JSON.stringify(data));
};