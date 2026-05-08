function createSocket(io, controller) {
  io.on('connection', (socket) => {
    console.log(`[SOCKET] Kết nối mới: ${socket.id}`);
 
    socket.on('user:join',     (data) => controller.handleJoin(io, socket, data));
    socket.on('message:send',  (data) => controller.handleMessage(io, socket, data));
    socket.on('typing:start',  (data) => controller.handleTypingStart(io, socket, data));
    socket.on('typing:stop',   (data) => controller.handleTypingStop(io, socket, data));
    socket.on('disconnect',    ()     => controller.handleDisconnect(io, socket));
  });
}
 
module.exports = { createSocket }