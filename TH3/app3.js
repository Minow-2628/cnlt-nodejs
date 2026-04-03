const express = require('express');
const path = require('path');
const app = express();

/* =====================
   CẤU HÌNH EJS
===================== */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* =====================
   STATIC FILES (CSS, JS, IMG)
===================== */
app.use(express.static(path.join(__dirname, 'public')));

/* =====================
   DỮ LIỆU MẪU
===================== */
const items = [
  {
    id: 1,
    name: 'Đà Lạt',
    description: 'Thành phố mộng mơ với khí hậu mát mẻ quanh năm',
    price: 1500000,
    hot: true
  },
  {
    id: 2,
    name: 'Nha Trang',
    description: 'Thành phố biển nổi tiếng với nhiều bãi tắm đẹp',
    price: 1800000,
    hot: false
  },
  {
    id: 3,
    name: 'Sa Pa',
    description: 'Khu du lịch vùng núi với khí hậu se lạnh',
    price: 2000000,
    hot: true
  },
  {
    id: 4,
    name: 'Phú Quốc',
    description: 'Đảo du lịch nổi tiếng ở miền Nam',
    price: 2500000,
    hot: false
  },
  {
    id: 5,
    name: 'Đà Nẵng',
    description: 'Thành phố hiện đại, sạch đẹp và đáng sống',
    price: 1700000,
    hot: true
  }
];

/* =====================
   ROUTES
===================== */

// Trang chủ
app.get('/', (req, res) => {
  res.render('index', { title: 'Trang chủ' });
});

// Trang danh sách
app.get('/list', (req, res) => {
  res.render('list', {
    title: 'Danh sách địa điểm',
    items: items
  });
});

// Trang liên hệ
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Liên hệ' });
});

// Trang chi tiết (route động)
app.get('/detail/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.send('Không tìm thấy dữ liệu');
  }

  res.render('detail', {
    title: 'Chi tiết địa điểm',
    item: item
  });
});

/* =====================
   KHỞI ĐỘNG SERVER
===================== */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});