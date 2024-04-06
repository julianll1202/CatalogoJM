var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home.html', { title: 'Inicio' });
});

router.get('/catalogo', function(req, res, next) {
  res.render('catalogue.html', { title: 'Catalogo' });
});

module.exports = router;
