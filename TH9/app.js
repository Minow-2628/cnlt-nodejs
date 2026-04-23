const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');

const app = express();

app.use(express.json());

app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});