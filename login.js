let users = JSON.parse(localStorage.getItem("users")) || [];

function login() {
  const userName = document.getElementById("userName").value.trim();
  const userPassword = document.getElementById("password").value.trim();

  if (!userName || !userPassword) {
    alert("Please enter both username and password");
    return;
  }
  

  const existingUser = users.find((user) => user.name === userName);

  if (existingUser) {
    if (existingUser.password === userPassword) {
      const currUser = { name: userName, score: 0, round: 0 };
      localStorage.setItem("currUser", JSON.stringify(currUser));
      localStorage.setItem("users", JSON.stringify(users));
      window.location.href = "home.html";
      alert("Login successful");
    } else {
      alert("Incorrect username or password");
    }
  } else {
    alert(
      "You are not registered in the system when entering details you are registered in the system"
    );
    const newUser = { name: userName, password: userPassword };
    const currUser = { name: userName, score: 0, round: 0 };
    localStorage.setItem("currUser", JSON.stringify(currUser));
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "home.html";
    alert("Registration successful");
  }
}

document.getElementById("submitLogin").addEventListener("click", function () {
  login();
});
