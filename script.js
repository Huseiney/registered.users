// Registered usernames and the master username
const registeredUsers = ["ab34", "zl23", "jn21", "dd22", "ds54", "ss27", "vv54"];
const masterUsername = "master8081";
// Load used usernames from localStorage
const usedUsernames = JSON.parse(localStorage.getItem("usedUsernames")) || {};

// Function to save used usernames to localStorage
function saveUsedUsernames() {
  localStorage.setItem("usedUsernames", JSON.stringify(usedUsernames));
}

// Function to check if a username is reusable
function canReuseUsername(username) {
  if (username === masterUsername) return true; // Allow master username to be reused anytime
  if (!usedUsernames[username]) return true; // Username has not been used before

  const lastUsedTime = usedUsernames[username];
  const currentTime = new Date().getTime();

  // Check if 5 hours (18000000 milliseconds) have passed since last use
  return currentTime - lastUsedTime >= 18000000;
}
// Event listener for form submission
document.getElementById("accessForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const responseDiv = document.getElementById("response");

  if (registeredUsers.includes(username)) {
    if (canReuseUsername(username)) {
      usedUsernames[username] = new Date().getTime(); // Record the current timestamp
      saveUsedUsernames(); // Persist the used usernames to localStorage
      responseDiv.innerHTML = `
        <p style="color: green;">
          🎉 Congratulations, ${username}! You are registered!<br>
          Welcome to the class.<br>
          <a href="#" target="_blank" style="color: white; text-decoration: dotted; text-decoration-color: red;">Join Class Now</a>
        </p>`;
    } else {
      const remainingTime = Math.ceil((18000000 - (new Date().getTime() - usedUsernames[username])) / 3600000);
      responseDiv.innerHTML = `
        <p style="color: orange;">
          ⚠️ Sorry, ${username} has already been used to access the link.<br>
          Please wait ${remainingTime} hour(s) before trying again.<br> or contact support.
        </p>`;
    }
  } else {
    responseDiv.innerHTML = `
      <p style="color: red;">
        🚫 Sorry, this ${username} is not registered. Please register to receive a unique username, its just 1000 kes. Thank you.
      </p>`;
  }
});
