const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Phân tích URL
    let urlData = url.parse(req.url, true);
    let pathname = urlData.pathname;

    // 1. Xử lý đường dẫn mặc định cho trang chủ
    if (pathname === '/' || pathname === '/index.html') {
        pathname = '/index.html';
    }

    // 2. Xác định vị trí file trên ổ cứng
    let filePath;
    if (pathname.startsWith('/files/')) {
        // Nếu URL bắt đầu bằng /files/, tìm trong thư mục files/
        filePath = '.' + pathname;
    } else {
        // Các trường hợp khác tìm trong thư mục views/
        filePath = './views' + pathname;
    }

    // 3. Đọc file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Lỗi không tìm thấy file:", filePath);
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<h2>404 - Không tìm thấy trang này!</h2>');
            return res.end();
        }

        // 4. Thiết lập Content-Type dựa trên đuôi file
        let contentType = 'text/html';
        if (pathname.endsWith('.css')) {
            contentType = 'text/css';
        }

        res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
        res.write(data);
        return res.end();
    });
});

// Chạy server tại cổng 8017
server.listen(8017, 'localhost', () => {
    console.log('Server đang chạy tại http://localhost:8017');
});