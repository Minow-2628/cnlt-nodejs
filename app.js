const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Kết nối DB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', postRoutes);

// Run
app.listen(3000, () => {
  console.log('Server chạy tại http://localhost:3000');
});