const express = require('express');
const app = express();

// dùng port 3000 để tránh xung đột
const PORT = 4000;

// cấu hình static resource
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});

// route giới thiệu
app.get('/about', (req, res) => {
    res.send('Trang giới thiệu');
});

// route liên hệ
app.get('/contact', (req, res) => {
    res.send('Trang liên hệ');
});

// chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});