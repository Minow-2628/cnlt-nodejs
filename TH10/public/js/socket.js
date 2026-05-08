var socket = io();

function socketJoin(username)                    { socket.emit('user:join', username); }
function socketSendMessage(receiverSocketId, msg){ socket.emit('message:send', { receiverSocketId: receiverSocketId, message: msg }); }
function socketTypingStart(rid)                  { socket.emit('typing:start', { receiverSocketId: rid }); }
function socketTypingStop(rid)                   { socket.emit('typing:stop',  { receiverSocketId: rid }); }

socket.on('join:error',  function(msg)  { uiShowLoginError(msg); });

socket.on('join:success', function(user) {
  console.log('[join:success]', user);
  Store.setMe(user);
  Store.addUser(user);
  uiSetMyAvatar(user);
  uiHideLogin();
});

socket.on('users:list', function(users) {
  console.log('[users:list]', users);
  users.forEach(function(u) { Store.addUser(u); });
  uiRenderUserList();
});

socket.on('user:joined', function(user) {
  Store.addUser(user);
  uiRenderUserList();
  uiShowToast(user, user.username + ' vừa tham gia', 'Đang hoạt động');
});

socket.on('user:left', function(data) {
  Store.removeUser(data.socketId);
  uiRenderUserList();
  uiShowToast(null, data.username + ' đã rời đi', '');
  if (Store.activeChat === data.socketId) uiSetPartnerOffline(data.username);
});

socket.on('message:sent', function(data) {
  console.log('[message:sent] data=', data, '| activeChat=', Store.activeChat);
  var msg = {
    sender:         data.sender,
    senderSocketId: Store.me.socketId,
    message:        data.message,
    time:           data.time,
    type:           'sent',
  };
  Store.pushMessage(data.receiverSocketId, msg);
  Store.setPreview(data.receiverSocketId, 'Bạn: ' + data.message);

  if (Store.activeChat === data.receiverSocketId) {
    console.log('[message:sent] → uiAppendMessage');
    uiAppendMessage(msg);
  } else {
    console.warn('[message:sent] KHÔNG HIỆN vì activeChat:', Store.activeChat, '!== receiverSocketId:', data.receiverSocketId);
  }
  uiRenderUserList();
});

socket.on('message:receive', function(data) {
  console.log('[message:receive] data=', data, '| activeChat=', Store.activeChat);
  var msg = {
    sender:         data.sender,
    senderSocketId: data.senderSocketId,
    message:        data.message,
    time:           data.time,
    type:           'received',
  };
  Store.pushMessage(data.senderSocketId, msg);
  Store.setPreview(data.senderSocketId, data.message);

  if (Store.activeChat === data.senderSocketId) {
    console.log('[message:receive] → uiAppendMessage');
    uiAppendMessage(msg);
  } else {
    Store.incrementUnread(data.senderSocketId);
    uiShowToast(Store.getUser(data.senderSocketId), data.sender, data.message);
  }
  uiRenderUserList();
});

socket.on('typing:start', function(data) {
  if (Store.activeChat !== data.senderSocketId) return;
  var user = Store.getUser(data.senderSocketId);
  if (user) uiShowTyping(user);
});

socket.on('typing:stop', function(data) {
  if (Store.activeChat === data.senderSocketId) uiHideTyping();
});