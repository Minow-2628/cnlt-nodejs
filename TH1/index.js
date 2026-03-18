const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')

    if (req.url === '/') {
        res.statusCode = 200
        res.end('Trang chủ')
    }
    else if (req.url === '/about') {
        res.statusCode = 200
        res.end('Trang giới thiệu')
    }
    else if (req.url === '/contact') {
        res.statusCode = 200
        res.end('Trang liên hệ')
    }
    else {
        res.statusCode = 404
        res.end('Không tìm thấy trang')
    }
})

server.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000')
})