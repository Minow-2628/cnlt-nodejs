const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // để dùng styles.css

// View engine
app.set('view engine', 'ejs');

// Kết nối MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
.then(() => console.log('Kết nối MongoDB thành công'))
.catch((error) => console.log(error));

// ===== Routes =====

// Trang danh sách bài viết
app.get('/', async (req, res) => {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    res.render('index', { posts });
});

// Trang tạo bài viết mới
app.get('/blogposts/new', (req, res) => {
    res.render('create');
});

// Lưu bài viết mới
app.post('/blogposts/store', async (req, res) => {
    await BlogPost.create({
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/');
});

// Trang chi tiết bài viết
app.get('/blogposts/:id', async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
});

// Trang chỉnh sửa bài viết
app.get('/blogposts/edit/:id', async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('edit', { post });
});

// Lưu chỉnh sửa bài viết
app.post('/blogposts/update/:id', async (req, res) => {
    await BlogPost.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/');
});

// Xóa bài viết
app.post('/blogposts/delete/:id', async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Server
app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});