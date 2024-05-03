import productsRouter from './products.js'
import categoriesRouter from './categories.js'
import imagesRouter from './images.js'
import indexRouter from './index.js'
import userRouter from './users.js'
import tokenRouter from './auth.js'

var express = require('express');
var router = express.Router();

router.use('/', indexRouter);
router.use('/productos', productsRouter);
router.use('/categorias', categoriesRouter);
router.use('/imagenes', imagesRouter);
router.use('/usuarios', userRouter);
router.use('/tokens', tokenRouter);


module.exports = router;