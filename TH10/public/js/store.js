// ============================================================
// store.js - Quản lý state phía client
// ============================================================

var Store = {
  me:          null,
  onlineUsers: {},
  activeChat:  null,
  chatHistory: {},
  unread:      {},
  lastPreview: {},

  setMe: function(user)       { this.me = user; },
  addUser: function(user)     { this.onlineUsers[user.socketId] = user; },
  removeUser: function(sid)   { delete this.onlineUsers[sid]; },
  getUser: function(sid)      { return this.onlineUsers[sid] || null; },
  getAllUsers: function()      { return Object.values(this.onlineUsers); },

  setActiveChat: function(sid) {
    this.activeChat = sid;
    this.unread[sid] = 0;
  },

  pushMessage: function(sid, msg) {
    if (!this.chatHistory[sid]) this.chatHistory[sid] = [];
    this.chatHistory[sid].push(msg);
  },
  getHistory: function(sid)       { return this.chatHistory[sid] || []; },
  incrementUnread: function(sid)  { this.unread[sid] = (this.unread[sid] || 0) + 1; },
  getUnread: function(sid)        { return this.unread[sid] || 0; },
  setPreview: function(sid, text) { this.lastPreview[sid] = text; },
  getPreview: function(sid)       { return this.lastPreview[sid] || 'Đang hoạt động'; },
};