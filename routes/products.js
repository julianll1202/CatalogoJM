var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('catalogue.html', { title: 'Productos' });
});

router.get('/agregar', function(req, res, next) {
  res.render('addProduct.html', { title: 'Agregar producto' });
});

module.exports = router;