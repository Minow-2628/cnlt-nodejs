/**
 * Model: Tạo object tin nhắn chuẩn
 */

function createMessage(sender, receiverSocketId, receiverName, message) {
  return {
    id:               Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    sender:           sender.username,
    senderSocketId:   sender.socketId,
    receiver:         receiverName,
    receiverSocketId: receiverSocketId,
    message:          message.trim(),
    time:             new Date().toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
    timestamp:        Date.now(),
  };
}

module.exports = { createMessage };