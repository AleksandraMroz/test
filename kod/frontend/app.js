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

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const appContent = document.getElementById("appContent");
const friendList = document.getElementById("friendList");
const addFriendForm = document.getElementById("addFriendForm");

// Rejestracja użytkownika
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    alert("Registered successfully! You can now log in.");
  } else {
    alert("Registration failed!");
  }
});

// Logowanie użytkownika
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    document.getElementById(
      "welcomeMessage"
    ).innerText = `Welcome, ${username}!`;
    appContent.style.display = "block";
  } else {
    alert("Login failed!");
  }
});

// Dodanie znajomego
addFriendForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const friendName = document.getElementById("friendName").value;
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: friendName }),
  });

  if (response.ok) {
    alert("Friend added!");
    loadFriends();
  } else {
    alert("Failed to add friend!");
  }
});

// Załaduj znajomych
async function loadFriends() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/friends", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const friends = await response.json();
    friendList.innerHTML = "";
    friends.forEach((friend) => {
      const li = document.createElement("li");
      li.innerText = friend.name;
      friendList.appendChild(li);
    });
  }
}
