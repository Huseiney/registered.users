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

  // Handle regular registered users
  if (registeredUsers.includes(username)) {
    responseDiv.innerHTML = `
      <p style="color: green;">
        🎉 Congratulations, ${username}! You are registered!<br>
        Welcome to the class.<br>
        ${joinClassLink}
      </p>`;
  } else {
    responseDiv.innerHTML = `
      <p style="color: red;">
        🚫 Sorry, ${username} is not registered. Please register to receive a unique username. It's just 1000 KES. Thank you.
      </p>`;
  }
});
