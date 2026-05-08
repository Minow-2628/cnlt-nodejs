/**
 * Model: Quản lý danh sách user đang online
 * Lưu trữ trong bộ nhớ (Map)
 */

/** @type {Map<string, {username: string, socketId: string, joinedAt: string}>} */
const users = new Map();

const UserModel = {
  /**
   * Thêm user mới
   * @param {string} socketId
   * @param {string} username
   * @returns {{ username: string, socketId: string, joinedAt: string }}
   */
  add(socketId, username) {
    const user = {
      socketId,
      username: username.trim(),
      joinedAt: new Date().toISOString(),
    };
    users.set(socketId, user);
    return user;
  },

  /**
   * Xóa user theo socketId
   * @param {string} socketId
   * @returns {object|null} user vừa bị xóa
   */
  remove(socketId) {
    const user = users.get(socketId);
    if (user) users.delete(socketId);
    return user || null;
  },

  /**
   * Tìm user theo socketId
   * @param {string} socketId
   */
  findById(socketId) {
    return users.get(socketId) || null;
  },

  /**
   * Kiểm tra tên đã tồn tại chưa (không phân biệt hoa thường)
   * @param {string} username
   */
  isDuplicate(username) {
    const lower = username.trim().toLowerCase();
    for (const u of users.values()) {
      if (u.username.toLowerCase() === lower) return true;
    }
    return false;
  },

  /**
   * Lấy tất cả users dưới dạng mảng
   */
  getAll() {
    return Array.from(users.values());
  },

  /**
   * Tổng số user online
   */
  count() {
    return users.size;
  },
};

module.exports = UserModel;