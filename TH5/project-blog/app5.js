const express = require('express');
const app = express();
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', postRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});