// ==============================
// MateVerse – Game Logic
// ==============================

const socket = io();

// Get room ID from URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("room");

if (roomId) {
  socket.emit("joinRoom", roomId);
}

// Chess logic
const game = new Chess();

const board = Chessboard("board", {
  draggable: true,
  position: "start",
  onDrop: onDrop
});

// Make game & board global (for socket sync safety)
window.game = game;
window.board = board;

// Handle move
function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: "q"
  });

  if (move === null) return "snapback";

  socket.emit("move", {
    move,
    room: roomId
  });

  updateStatus();
}

// Receive opponent move
socket.on("move", (data) => {
  game.move(data.move);
  board.position(game.fen());
  updateStatus();
});

// Update status text
function updateStatus() {
  let status = "";

  if (game.in_checkmate()) {
    status = "Game Over – Checkmate!";
  } else if (game.in_draw()) {
    status = "Game Over – Draw";
  } else {
    status = "Turn: " + (game.turn() === "w" ? "White" : "Black");
  }

  document.getElementById("status").innerText = status;
}