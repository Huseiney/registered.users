// Registered usernames and the master username
const registeredUsers = ["ab34", "zl23", "jn21", "dd22", "ds54", "ss27", "vv54", "bv65", "zk49", "dg88", "ds91"];
const masterUsername = "master8081";

// Google Meet Link (replace with your actual meeting link)
const googleMeetLink = "https://meet.google.com/qwz-egxg-wpm";

// Compact "Join Class Now" Button Styling
const joinClassLink = `
  <a href="${googleMeetLink}" target="_blank" 
     style="
       color: white; 
       background-color: #0078ff; 
       font-size: 14px; 
       font-family: Arial, sans-serif; 
       padding: 8px 20px; 
       text-decoration: none; 
       border-radius: 20px; 
       border: 1px solid #005bb5;
       display: inline-block;
       margin-top: 10px;
     ">
    Join Class Now
  </a>`;

// Event listener for form submission
document.getElementById("accessForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const responseDiv = document.getElementById("response");

  if (username === masterUsername) {
    responseDiv.innerHTML = `
      <p style="color: green;">
        🎉 This username belongs to the Admin. You are only allowed to use it once.<br>
        ${joinClassLink}
      </p>`;
    return;
  }

  if (registeredUsers.includes(username)) {
    responseDiv.innerHTML = `
      <p style="color: green;">
        🎉 Congratulations, ${username}! Thabk you for registering!<br>
        Welcome to the class.<br>
        ${joinClassLink}
      </p>`;
  } else {
    responseDiv.innerHTML = `
      <p style="color: red;">
        🚫 Sorry, ${username} is not registered. Please contact admin or try again.</p>`;
  }
});
