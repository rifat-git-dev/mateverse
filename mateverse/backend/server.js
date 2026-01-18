// ==============================
// MateVerse – Main Server File
// ==============================

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ------------------------------
// Serve Frontend Files
// ------------------------------
app.use(express.static("../frontend"));

// ------------------------------
// Socket Logic (Separated)
// ------------------------------
require("./socket")(io);

// ------------------------------
// Basic Health Route (Optional)
// ------------------------------
app.get("/health", (req, res) => {
  res.json({ status: "MateVerse server running" });
});

// ------------------------------
// Start Server
// ------------------------------
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`♟ MateVerse running at http://localhost:${PORT}`);
});