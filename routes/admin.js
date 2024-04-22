import productsRouter from './products.js'
import categoriesRouter from './categories.js'
import imagesRouter from './images.js'
import indexRouter from './index.js'
var express = require('express');
var router = express.Router();

router.use('/', indexRouter);
router.use('/productos', productsRouter);
router.use('/categorias', categoriesRouter);
router.use('/imagenes', imagesRouter);

module.exports = router;