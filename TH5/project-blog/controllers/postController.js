const BlogPost = require('../models/BlogPost');

// Trang chủ – danh sách bài viết
exports.index = async (req, res) => {
  const posts = await BlogPost.find({}).sort({ createdAt: -1 });
  res.render('index', { posts });
};

// Form tạo bài viết
exports.createForm = (req, res) => {
  res.render('create');
};

// Lưu bài viết mới
exports.store = async (req, res) => {
  await BlogPost.create({
    title: req.body.title,
    body: req.body.body
  });
  res.redirect('/');
};

// Chi tiết bài viết
exports.show = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render('detail', { post });
};

// Form sửa bài viết
exports.editForm = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render('edit', { post });
};

// Lưu thay đổi bài viết
exports.update = async (req, res) => {
  await BlogPost.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body
  });
  res.redirect('/'); // quay về danh sách để giữ giao diện cũ
};

// Xóa bài viết
exports.delete = async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.redirect('/');
};