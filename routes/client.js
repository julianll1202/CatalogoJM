var express = require('express');
const { getProducts, getProductsOfCategory, getProductById, getLatestProducts } = require('../controllers/productController');
const { getCategories } = require('../controllers/categoryController');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const cats = await getCategories();
  const latestProducts = await getLatestProducts();
  const productos = await getProducts();
  res.render('cliente/index.html', { title: 'Inicio',uploadsURL: process.env.UPLOADED_IMAGES_URL, recientes: latestProducts, productos: productos, categorias: cats});
});
/* GET inventario page. */
router.get('/inventario/:id?', async function(req, res, next) {
  const cats = await getCategories();
  const id = req.params.id;
  let productos = []
  console.log(id)
  if (id === '' || id === undefined)
    productos = await getProducts();
  else
    productos = await getProductsOfCategory(Number(id));
  console.log(productos)
  res.render('cliente/inventory.html', { title: 'Inventario',uploadsURL: process.env.UPLOADED_IMAGES_URL, products: productos, categorias: cats, categoriaSelect: Number(id) });
});

router.get('/inventario/producto/:id', async function (req, res) {
  const id = req.params.id;
  const producto = await getProductById(Number(id));
  res.render('cliente/product.html', { title: 'Producto',uploadsURL: process.env.UPLOADED_IMAGES_URL, product: producto});
});


module.exports = router;