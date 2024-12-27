document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Rejestracja użytkownika
  const registerUser = async () => {
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "test",
        email: "test@example.com",
        password: "123456",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  registerUser();
});
