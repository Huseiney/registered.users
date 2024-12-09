// Registered usernames and the master username
const registeredUsers = ["ab34", "zl23", "jn21", "dd22", "ds54"];
const masterUsername = "btc24";

// Track used usernames with timestamps
const usedUsernames = {};

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
      responseDiv.innerHTML = `
        <p style="color: white; background-color: red;">
          🎉 Congratulations, ${username}! You are registered!<br>
          You are ready to start your journey toward financial freedom.<br>
          <a href="#" target="_blank" style="color: #00ff00; text-decoration: underline;">Join the Google Meet</a>
        </p>`;
    } else {
      const remainingTime = Math.ceil((18000000 - (new Date().getTime() - usedUsernames[username])) / 3600000);
      responseDiv.innerHTML = `
        <p style="color: orange;">
          ⚠️ Sorry, ${username} can be used by registered student only..<br>
          Please register to receive your own and trying again.<br>
          If you are registered and unable to receive link, contact the admin.
        </p>`;
    }
  } else {
    responseDiv.innerHTML = `
      <p style="color: red;">
        🚫 Sorry, ${username}. The server says you're not registered.<br>
        But don't give up—please contact support or double-check your username.<br>
        We're here to help you on your path to success!
      </p>`;
  }
});
