var express = require('express');
const { getProducts, getProductsOfCategory } = require('../controllers/productController');
const { getCategories } = require('../controllers/categoryController');
var router = express.Router();

/* GET home page. */
router.get('/:name', async function(req, res, next) {
  const cats = await getCategories();
  const nombre = req.params.name;
  // const productos = await getProducts();

  let productos = []
  if (nombre === '' || nombre === undefined)
    productos = await getProducts();
  else
    productos = await getProductsOfCategory(Number(nombre));
  res.render('cliente/index.html', { title: 'Inicio',uploadsURL: process.env.UPLOADED_IMAGES_URL, productos: productos, categorias: cats, categoriaSelect: nombre });
});


module.exports = router;