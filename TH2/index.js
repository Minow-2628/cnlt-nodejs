const express = require('express');
const path = require('path');

const app = express();

// đăng ký static public
app.use(express.static('public'));

// route trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});