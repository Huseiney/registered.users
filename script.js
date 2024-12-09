// Registered usernames (can be updated dynamically via a server)
const registeredUsers = ["ab34", "zl23", "jn21", "dd22", "ds54"];

document.getElementById("accessForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const responseDiv = document.getElementById("response");

  if (registeredUsers.includes(username)) {
    responseDiv.innerHTML = `
      <p style="color: green;">
        🎉 Congratulations, ${username}! You are registered!<br>
        You are ready to start your journey toward financial freedom.<br>
        <a href="https://meet.google.com/your-meet-link" target="_blank" style="color: #00ff00; text-decoration: underline;">Join the Google Meet</a>
      </p>`;
  } else {
    responseDiv.innerHTML = `
      <p style="color: red;">
        🚫 Sorry, ${username}. The server says you're not registered.<br>
        But don't give up—please contact support or double-check your username.<br>
        We're here to help you on your path to success!
      </p>`;
  }
});
