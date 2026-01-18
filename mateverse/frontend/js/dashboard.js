// ==============================
// MateVerse Dashboard Logic
// ==============================

// Connect to Socket.IO server
const socket = io();

// Elements
const findMatchBtn = document.getElementById("findMatchBtn");
const statusText = document.getElementById("dashboardStatus");

// ---- FIND MATCH ----
if (findMatchBtn) {
  findMatchBtn.addEventListener("click", () => {
    findMatchBtn.innerText = "🔎 Finding Match...";
    findMatchBtn.disabled = true;

    if (statusText) {
      statusText.innerText = "Searching for an opponent...";
    }

    socket.emit("findMatch");
  });
}

// ---- MATCH FOUND ----
socket.on("matchFound", (roomId) => {
  if (statusText) {
    statusText.innerText = "Match found! Joining game...";
  }

  // Small delay for better UX
  setTimeout(() => {
    window.location.href = `game.html?room=${roomId}`;
  }, 1000);
});

// ---- OPTIONAL: CONNECTION STATUS ----
socket.on("connect", () => {
  console.log("Connected to MateVerse server");
});

socket.on("disconnect", () => {
  if (statusText) {
    statusText.innerText = "Disconnected from server";
  }
});