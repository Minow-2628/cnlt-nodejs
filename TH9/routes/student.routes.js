const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');
const requireLogin = require('../middleware/requireLogin');

router.get('/', controller.getAll);
router.post('/', requireLogin, controller.create);
router.delete('/:id', requireLogin, controller.remove);

module.exports = router;