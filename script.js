// Registered usernames and the master username
const registeredUsers = ["ab34", "zl23", "jn21", "dd22", "ds54", "ss27"];
const masterUsername = "master24";

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
        <p style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; animation: bounceIn 2s ease-in-out;">
          🎉 Hi, our system shows you're registered.  You are allowed to join class. >
          Please do not share your username with non-registered to avoid penalty.  Our system can detect it.<br>
          <a href="#" target="_blank" style="color: red; text-decoration: none; background-color:white;">Join class.</a>
        </p>`;
    } else {
      const remainingTime = Math.ceil((18000000 - (new Date().getTime() - usedUsernames[username])) / 3600000);
      responseDiv.innerHTML = `
        <p style="color: orange;">
          ⚠️ Sorry, ${username} belongs to someone else. Get yours by registering. <br>
          If you are registered and received this error, contact admin immediately. Thank you
        </p>`;
    }
  } else {
    responseDiv.innerHTML = `
      <p style="color: red;">
       ❌️ERROR! Our system shows you're not registered. If you're registered and unable to join class,<br>contact admin ASAP!
      </p>`;
  }
});
