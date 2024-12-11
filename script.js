// Registered usernames and the master username
const registeredUsers = ["ab34", "zl23", "jn21", "dd22", "ds54", "ss27", "vv54"];
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
  <div style="
      border: 2px solid #4CAF50;
      border-radius: 8px;
      background-color: #f0f8ff;
      padding: 15px;
      margin-top: 20px;
      font-family: Arial, sans-serif;
      color: #333;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  ">
    <h3 style="color: #4CAF50; font-size: 1.5em;">🎉 Congratulations, ${username}!</h3>
    <p style="font-size: 1.2em; margin: 10px 0;">
      You are one of our student because you are registered.
    </p>
    <a href="#" target="_blank" style="
        display: inline-block;
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
    ">Join the class</a>
  </div>`;
        <p style="color: orange;">
          ⚠️ Sorry, ${username} belongs to someone else. Get yours by registering. <br>
          If you are registered and received this error, contact admin immediately. Thank you
        </p>`;
    }
  } else {
    responseDiv.innerHTML = `
      <p style="color: red;">
       ❌️ERROR! your name is not in our system. If you're registered and unable to join class,<br>contact admin ASAP!
      </p>`;
  }
});
