import { getAuth } from "firebase/auth";

const auth = getAuth();

const user = auth.currentUser;

if (user) {
  const token = await user.getIdToken();
  console.log("ID Token:", token);

  // Agora envie nas requisições para sua API:
  const response = await fetch("http://localhost:3000/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
}
