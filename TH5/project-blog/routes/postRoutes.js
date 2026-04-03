const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

// Trang chủ
router.get('/', controller.index);

// Tạo bài viết mới
router.get('/blogposts/new', controller.createForm);
router.post('/blogposts/store', controller.store);

// Chi tiết bài viết
router.get('/blogposts/:id', controller.show);

// Sửa bài viết
router.get('/blogposts/:id/edit', controller.editForm);
router.post('/blogposts/:id/update', controller.update);

// Xóa bài viết
router.post('/blogposts/:id/delete', controller.delete);

module.exports = router;