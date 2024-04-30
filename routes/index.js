var express = require('express');
const { authenticateToken } = require('../services/authentication');
const { getUserById } = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/', authenticateToken, async function(req, res, next) {
  const user = await getUserById(req.payload.userId)
  res.render('home.html', { title: 'Inicio', usuario: user });
});


module.exports = router;
