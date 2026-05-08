// ============================================================
// ui.js - Toàn bộ thao tác DOM / render
// ============================================================

var UI = {
  loginOverlay:  document.getElementById('login-overlay'),
  usernameInput: document.getElementById('username-input'),
  joinBtn:       document.getElementById('join-btn'),
  loginError:    document.getElementById('login-error'),
  myAvatar:      document.getElementById('my-avatar'),
  userList:      document.getElementById('user-list'),
  searchInput:   document.getElementById('search-input'),
  emptyState:    document.getElementById('empty-state'),
  chatHeader:    document.getElementById('chat-header'),
  chAvatar:      document.getElementById('ch-avatar'),
  chName:        document.getElementById('ch-name'),
  chStatus:      document.getElementById('ch-status'),
  messagesWrap:  document.getElementById('messages-wrap'),
  messages:      document.getElementById('messages'),
  typingInd:     document.getElementById('typing-ind'),
  typingAv:      document.getElementById('typing-av'),
  inputArea:     document.getElementById('input-area'),
  msgInput:      document.getElementById('msg-input'),
  sendBtn:       document.getElementById('send-btn'),
  likeBtn:       document.getElementById('like-btn'),
  toasts:        document.getElementById('toasts'),
};

function uiShowLoginError(msg) { UI.loginError.textContent = msg; }
function uiHideLogin()         { UI.loginOverlay.style.display = 'none'; }

function uiSetMyAvatar(user) {
  UI.myAvatar.className   = 'avatar ' + getColor(user.socketId);
  UI.myAvatar.textContent = initial(user.username);
}

function uiRenderUserList() {
  var query = UI.searchInput.value.toLowerCase();
  UI.userList.innerHTML = '';
  Store.getAllUsers().forEach(function(u) {
    if (u.socketId === (Store.me && Store.me.socketId)) return;
    if (query && u.username.toLowerCase().indexOf(query) === -1) return;
    var c     = getColor(u.socketId);
    var isAct = Store.activeChat === u.socketId;
    var badge = Store.getUnread(u.socketId);
    var item  = document.createElement('div');
    item.className   = 'user-item' + (isAct ? ' active' : '');
    item.dataset.sid = u.socketId;
    item.innerHTML =
      '<div class="avatar-wrap"><div class="avatar ' + c + '">' + initial(u.username) + '</div><span class="online-dot"></span></div>' +
      '<div class="user-meta"><div class="user-name">' + escHtml(u.username) + '</div>' +
      '<div class="user-sub ' + (badge > 0 ? 'bold' : '') + '">' + escHtml(Store.getPreview(u.socketId)) + '</div></div>' +
      (badge > 0 ? '<div class="unread-dot"></div>' : '');
    item.addEventListener('click', function() { appOpenChat(u.socketId); });
    UI.userList.appendChild(item);
  });
}

function uiOpenChatPanel(user) {
  UI.chAvatar.className   = 'avatar ' + getColor(user.socketId);
  UI.chAvatar.textContent = initial(user.username);
  UI.chName.textContent   = user.username;
  UI.chStatus.textContent = 'Đang hoạt động';
  UI.chStatus.style.color = 'var(--online)';
  UI.emptyState.style.display   = 'none';
  UI.chatHeader.style.display   = 'flex';
  UI.messagesWrap.style.display = 'flex';
  UI.inputArea.style.display    = 'flex';
}

function uiSetPartnerOffline(username) {
  UI.chName.textContent   = username + ' (Offline)';
  UI.chStatus.textContent = 'Đã offline';
  UI.chStatus.style.color = 'var(--text-secondary)';
}

function uiRenderMessages(history) {
  UI.messages.innerHTML = '';
  if (!history.length) {
    UI.messages.innerHTML = '<div class="empty-msg">Hãy gửi lời chào đầu tiên! 👋</div>';
    return;
  }
  groupMessages(history).forEach(function(g) {
    UI.messages.appendChild(buildGroupEl(g));
  });
  scrollBottom(UI.messages);
}

function uiAppendMessage(msg) {
  // Xóa placeholder nếu còn
  var ph = UI.messages.querySelector('.empty-msg');
  if (ph) ph.remove();

  var lastGroup = UI.messages.querySelector('.msg-group:last-child');
  if (lastGroup && lastGroup.classList.contains(msg.type)) {
    lastGroup.querySelector('.bubble-stack').appendChild(
      Object.assign(document.createElement('div'), { className: 'bubble', textContent: msg.message })
    );
    var t = lastGroup.querySelector('.msg-time');
    if (t) t.textContent = msg.time;
  } else {
    var sid = msg.type === 'sent' ? Store.me.socketId : msg.senderSocketId;
    UI.messages.appendChild(buildGroupEl({ type: msg.type, sid: sid, name: msg.sender, items: [msg] }));
  }
  scrollBottom(UI.messages);
}

function uiShowTyping(user) {
  UI.typingAv.className   = 'typing-av ' + getColor(user.socketId);
  UI.typingAv.textContent = initial(user.username);
  UI.typingInd.style.display = 'flex';
  scrollBottom(UI.messages);
}
function uiHideTyping() { UI.typingInd.style.display = 'none'; }

function uiUpdateSendBtn() {
  var has = UI.msgInput.value.trim().length > 0;
  UI.sendBtn.style.display = has ? 'flex' : 'none';
  UI.likeBtn.style.display = has ? 'none' : 'flex';
}
function uiClearInput() {
  UI.msgInput.value = '';
  UI.msgInput.style.height = 'auto';
  uiUpdateSendBtn();
}

function uiShowToast(user, title, sub) {
  var el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML =
    '<div class="toast-av ' + (user ? getColor(user.socketId) : 'c7') + '">' + (user ? initial(user.username) : '!') + '</div>' +
    '<div><div class="t-name">' + escHtml(title) + '</div>' +
    (sub ? '<div class="t-msg">' + escHtml(String(sub).substring(0,50)) + '</div>' : '') + '</div>';
  UI.toasts.appendChild(el);
  setTimeout(function() { el.remove(); }, 3500);
}

function groupMessages(history) {
  var groups = [];
  history.forEach(function(msg) {
    var last = groups[groups.length - 1];
    if (last && last.type === msg.type) { last.items.push(msg); }
    else { groups.push({ type: msg.type, sid: msg.senderSocketId, name: msg.sender, items: [msg] }); }
  });
  return groups;
}

function buildGroupEl(g) {
  var sid = g.type === 'sent' ? (Store.me && Store.me.socketId) : g.sid;
  var div = document.createElement('div');
  div.className = 'msg-group ' + g.type;
  div.innerHTML =
    '<div class="msg-row"><div class="sender-av ' + getColor(sid || g.sid) + '">' + initial(g.name) + '</div>' +
    '<div class="bubble-stack">' + g.items.map(function(m){ return '<div class="bubble">' + escHtml(m.message) + '</div>'; }).join('') + '</div></div>' +
    '<div class="msg-time">' + g.items[g.items.length-1].time + '</div>';
  return div;
}