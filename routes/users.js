var express = require('express');
const { addUser } = require('../controllers/userController');
const { login } = require('../controllers/authController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/crear', async function(req, res, next) {
  const userInfo = req.body;
  const user = await addUser(userInfo);
  if (user !== 'User not created')
    return res.status(201).send(user);
  else
    return res.status(400).send(user);
});

router.get('/login', function(req, res, next) {
  res.render('login.html')
});

router.post('/login', async function(req, res, next) {
  const userInfo = req.body;
  console.log(userInfo)
  const user = await login(userInfo);
  if (user.response === 'Authorized entry') {
    res.cookie("accessToken", user.accessToken, { maxAge: 3600000, httpOnly: false })
    res.cookie("refreshToken", user.refreshToken, { maxAge: 3600000, httpOnly: false })
    return res.status(200).send(user);
  } else {
    return res.status(403).send(user);
  }
});
module.exports = router;
