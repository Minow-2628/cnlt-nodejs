const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Trang chủ' });
});

app.get('/list', (req, res) => {
    const products = [
        { id: 1, name: 'Sản phẩm 1' },
        { id: 2, name: 'Sản phẩm 2' },
        { id: 3, name: 'Sản phẩm 3' }
    ];

    res.render('list', { 
        title: 'Danh sách',
        products 
    });
});

app.get('/detail/:id', (req, res) => {
    res.render('detail', { 
        title: 'Chi tiết',
        id: req.params.id 
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Liên hệ' 
    });
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});