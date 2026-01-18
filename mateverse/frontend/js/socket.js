// ==============================
// MateVerse – Socket Handler
// ==============================

// Connect to Socket.IO server
const socket = io();

// ---- ROOM JOINING ----
function joinRoom(roomId) {
  if (!roomId) return;
  socket.emit("joinRoom", roomId);
}

// ---- SEND MOVE ----
function sendMove(move, roomId) {
  socket.emit("move", {
    move,
    room: roomId
  });
}

// ---- RECEIVE MOVE ----
socket.on("move", (data) => {
  if (window.game && window.board) {
    game.move(data.move);
    board.position(game.fen());
    if (typeof updateStatus === "function") {
      updateStatus();
    }
  }
});

// ---- OPTIONAL: CONNECTION STATUS ----
socket.on("connect", () => {
  console.log("🟢 Connected to MateVerse server");
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected from MateVerse server");
});

// ---- FUTURE EVENTS (READY) ----
// socket.on("chatMessage", () => {})
// socket.on("gameOver", () => {})
// socket.on("spectatorJoined", () => {})