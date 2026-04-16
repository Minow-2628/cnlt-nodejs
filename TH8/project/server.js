const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8017;

/* static css */
app.use(express.static("public"));

/* tự tạo thư mục uploads */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

/* cấu hình multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname)
});

const uploadManyFiles = multer({ storage }).array("many-files", 17);

/* trang upload */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "master.html"));
});

/* xử lý upload */
app.post("/upload", (req, res) => {
    uploadManyFiles(req, res, err => {
        if (err || !req.files || req.files.length === 0) {
            return res.redirect("/result?status=error");
        }
        res.redirect(`/result?status=success&count=${req.files.length}`);
    });
});

/* trang kết quả */
app.get("/result", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "result.html"));
});

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});