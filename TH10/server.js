const { createApp }    = require('./src/config/app.config');
const { createSocket } = require('./src/config/socket.config');
const indexRouter      = require('./src/routes/index.route');
const ChatController   = require('./src/controllers/chat.controller');
const SERVER           = require('./src/config/server.config');

const { app, server, io } = createApp();

app.use('/', indexRouter);

createSocket(io, ChatController);

server.listen(SERVER.PORT, () => {
  console.log('================================');
  console.log(`  ✅  Messenger App - MVC`);
  console.log(`  🌐  http://localhost:${SERVER.PORT}`);
  console.log('================================');
});