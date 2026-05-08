// ============================================================
// app.js - Controller chính, gắn UI events
// ============================================================

var _typingTimer = null;

// ── Mở chat với một user ─────────────────────────────────────
function appOpenChat(socketId) {
  var user = Store.getUser(socketId);
  if (!user) return;

  Store.setActiveChat(socketId);
  uiOpenChatPanel(user);
  uiRenderMessages(Store.getHistory(socketId));
  uiRenderUserList();
  UI.msgInput.focus();
}

// ── Gửi tin nhắn ─────────────────────────────────────────────
function appSend() {
  var text = UI.msgInput.value.trim();
  if (!text || !Store.activeChat) return;
  if (!Store.getUser(Store.activeChat)) {
    uiShowToast(null, 'Người dùng đã offline!', '');
    return;
  }
  socketSendMessage(Store.activeChat, text);
  socketTypingStop(Store.activeChat);
  uiClearInput();
}

// ── Gắn tất cả UI events ─────────────────────────────────────
UI.joinBtn.addEventListener('click', function() {
  var name = UI.usernameInput.value.trim();
  if (!name) { uiShowLoginError('Vui lòng nhập tên!'); return; }
  uiShowLoginError('');
  socketJoin(name);
});

UI.usernameInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') UI.joinBtn.click();
});

UI.sendBtn.addEventListener('click', function() {
  appSend();
});

UI.msgInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    appSend();
  }
});

UI.msgInput.addEventListener('input', function() {
  UI.msgInput.style.height = 'auto';
  UI.msgInput.style.height = Math.min(UI.msgInput.scrollHeight, 100) + 'px';
  uiUpdateSendBtn();

  if (Store.activeChat) {
    socketTypingStart(Store.activeChat);
    clearTimeout(_typingTimer);
    _typingTimer = setTimeout(function() {
      socketTypingStop(Store.activeChat);
    }, 1500);
  }
});

UI.likeBtn.addEventListener('click', function() {
  if (!Store.activeChat || !Store.getUser(Store.activeChat)) return;
  socketSendMessage(Store.activeChat, '👍');
});

UI.searchInput.addEventListener('input', function() {
  uiRenderUserList();
});