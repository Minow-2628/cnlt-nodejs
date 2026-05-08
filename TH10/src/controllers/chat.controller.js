const UserModel            = require('../models/user.model');
const { createMessage }    = require('../models/message.model');

const ChatController = {

  handleJoin(io, socket, username) {
    if (!username || !username.trim()) {
      return socket.emit('join:error', 'Tên không được để trống!');
    }
    if (UserModel.isDuplicate(username)) {
      return socket.emit('join:error', 'Tên này đã được dùng. Chọn tên khác!');
    }

    const user = UserModel.add(socket.id, username);
    socket.username = user.username;
    console.log(`[JOIN] ${user.username} (${socket.id}) | Online: ${UserModel.count()}`);

    socket.emit('join:success', user);
    socket.emit('users:list', UserModel.getAll());
    socket.broadcast.emit('user:joined', user);
  },

  handleMessage(io, socket, { receiverSocketId, message }) {
    const sender = UserModel.findById(socket.id);
    if (!sender) return;
    if (!message || !message.trim()) return;

    const receiver = UserModel.findById(receiverSocketId);
    if (!receiver) {
      return socket.emit('message:error', 'Người dùng đã offline!');
    }

    const msgData = createMessage(sender, receiverSocketId, receiver.username, message);

    console.log(`[MSG] ${sender.username} → ${receiver.username}: ${message.substring(0, 40)}`);

    io.to(receiverSocketId).emit('message:receive', msgData);
    socket.emit('message:sent', msgData);
  },

  handleTypingStart(io, socket, { receiverSocketId }) {
    const sender = UserModel.findById(socket.id);
    if (!sender) return;
    io.to(receiverSocketId).emit('typing:start', {
      senderSocketId: socket.id,
      username: sender.username,
    });
  },

  handleTypingStop(io, socket, { receiverSocketId }) {
    io.to(receiverSocketId).emit('typing:stop', { senderSocketId: socket.id });
  },

  handleDisconnect(io, socket) {
    const user = UserModel.remove(socket.id);
    if (!user) return;
    console.log(`[LEAVE] ${user.username} | Online: ${UserModel.count()}`);
    io.emit('user:left', { username: user.username, socketId: socket.id });
  },
};

module.exports = ChatController;