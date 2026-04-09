const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// ===== Routes =====

// Trang danh sách bài viết
app.get('/', async (req, res) => {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    const msg = req.query.msg;
    res.render('index', { posts, msg });
});

// Tạo bài viết mới
app.get('/blogposts/new', (req, res) => res.render('create'));

// Lưu bài viết mới
app.post('/blogposts/store', async (req, res) => {
    await BlogPost.create({ title: req.body.title, body: req.body.body });
    res.redirect('/?msg=Bài viết đã được tạo thành công');
});

// Chi tiết bài viết
app.get('/blogposts/:id', async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
});

// Trang chỉnh sửa
app.get('/blogposts/edit/:id', async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('edit', { post });
});

// Lưu chỉnh sửa
app.post('/blogposts/update/:id', async (req, res) => {
    await BlogPost.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/?msg=Bài viết đã được cập nhật thành công');
});

// Xóa bài viết
app.post('/blogposts/delete/:id', async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/?msg=Bài viết đã được xóa thành công');
});

// Server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));