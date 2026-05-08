// ============================================================
// helpers.js - Hàm tiện ích dùng chung
// ============================================================

const COLORS = ['c0','c1','c2','c3','c4','c5','c6','c7'];
const _colorMap = {};
let _colorIdx = 0;

function getColor(sid) {
  if (!_colorMap[sid]) _colorMap[sid] = COLORS[_colorIdx++ % COLORS.length];
  return _colorMap[sid];
}

function initial(name) {
  return name.charAt(0).toUpperCase();
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function scrollBottom(el) {
  el.scrollTop = el.scrollHeight;
}