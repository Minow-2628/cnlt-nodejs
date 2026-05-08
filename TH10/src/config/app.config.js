const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');
const path     = require('path');

/**
 * Tạo Express app, HTTP server, Socket.IO instance
 * @returns {{ app, server, io }}
 */
function createApp() {
  const app    = express();
  const server = http.createServer(app);
  const io     = new socketIO.Server(server);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Phục vụ file tĩnh
  app.use(express.static(path.join(__dirname, '../../public')));

  return { app, server, io };
}

module.exports = { createApp };