const students = require('../data/students');

exports.getAll = (req, res) => {
  res.json(students);
};

exports.create = (req, res) => {
  let { name, email, age, className } = req.body;

  // FIX Invalid name
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Invalid name' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  // FIX age = 18 vẫn lỗi
  age = Number(age);
  if (!Number.isInteger(age) || age < 16 || age > 60) {
    return res.status(400).json({ message: 'Invalid age' });
  }

  if (!className || className.trim() === '') {
    return res.status(400).json({ message: 'Invalid class' });
  }

  const student = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    age,
    className: className.trim()
  };

  students.push(student);
  res.json(student);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) students.splice(index, 1);
  res.json({ success: true });
};