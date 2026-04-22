const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let students = [
  { id: 1, name: "Nguyen Van A", email: "a@gmail.com", status: "Hoạt động" },
  { id: 2, name: "Tran Thi B", email: "b@gmail.com", status: "Hoạt động" }
];

// Lấy danh sách
app.get("/students", (req, res) => {
  res.json(students);
});

// Lấy 1 sinh viên
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  res.json(student);
});

// Thêm sinh viên
app.post("/students", (req, res) => {
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    status: "Hoạt động"
  };
  students.push(newStudent);
  res.json(newStudent);
});

// Sửa sinh viên
app.put("/students/:id", (req, res) => {
  students = students.map(s =>
    s.id == req.params.id
      ? { ...s, name: req.body.name, email: req.body.email }
      : s
  );
  res.json({ success: true });
});

// Xóa sinh viên
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});