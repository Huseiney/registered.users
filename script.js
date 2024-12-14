// Registered usernames and the master username
const registeredUsers = ["ab34", "zl23", "jn21", "dd22", "ds54", "ss27", "vv54", "bv65"];
const masterUsername = "master8081";

// Common styling for the "Join Class Now" link
const joinClassLink = `
  <a href="#" target="_blank" 
     style="
       color: white; 
       background-color: red; 
       font-size: larger; 
       font-family: fantasy; 
       padding: 10px; 
       text-decoration: none; 
       border-radius: 50px 60px; 
       border: double 3px blue;
     ">
    Join Class Now
  </a>`;

// Event listener for form submission
document.getElementById("accessForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const responseDiv = document.getElementById("response");

  // Handle master username explicitly
  if (username === masterUsername) {
    responseDiv.innerHTML = `
      <p style="color: green;">
        🎉 This username belongs to the Admin. You are only allowed to use it if yours is not working.<br>
        ${joinClassLink}
      </p>`;
    return;
  }

  if (registeredUsers.includes(username)) {
    if (canReuseUsername(username)) {
      usedUsernames[username] = new Date().getTime(); // Record the current timestamp
      saveUsedUsernames(); // Persist the used usernames to localStorage
      responseDiv.innerHTML = `
        <p style="color: green;">
          🎉 Congratulations, ${username}! You are registered!<br>
          Welcome to the class.<br>
          ${joinClassLink}
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
        🚫 Sorry, ${username} is not registered. Please register to receive a unique username. It's just 1000 KES. Thank you.
      </p>`;
  }
});
