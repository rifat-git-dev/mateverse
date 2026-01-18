// ==============================
// MateVerse – Socket Logic
// ==============================

module.exports = function (io) {
  // Matchmaking queue
  let waitingPlayer = null;

  io.on("connection", (socket) => {
    console.log("🟢 Player connected:", socket.id);

    // ------------------------------
    // MATCHMAKING
    // ------------------------------
    socket.on("findMatch", () => {
      if (waitingPlayer) {
        const roomId = `room-${waitingPlayer.id}-${socket.id}`;

        waitingPlayer.join(roomId);
        socket.join(roomId);

        waitingPlayer.emit("matchFound", roomId);
        socket.emit("matchFound", roomId);

        waitingPlayer = null;
      } else {
        waitingPlayer = socket;
      }
    });

    // ------------------------------
    // JOIN GAME ROOM
    // ------------------------------
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Player ${socket.id} joined ${roomId}`);
    });

    // ------------------------------
    // MOVE SYNC
    // ------------------------------
    socket.on("move", (data) => {
      // data = { move, room }
      socket.to(data.room).emit("move", data);
    });

    // ------------------------------
    // DISCONNECT
    // ------------------------------
    socket.on("disconnect", () => {
      if (waitingPlayer === socket) {
        waitingPlayer = null;
      }
      console.log("🔴 Player disconnected:", socket.id);
    });
  });
};