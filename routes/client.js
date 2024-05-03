var express = require('express');
const { getProducts, getProductsOfCategory, getProductById, getLatestProducts, getProductsOfClass } = require('../controllers/productController');
const { getCategories, getClasses, getCategoriesOfClass } = require('../controllers/categoryController');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const cats = await getCategories();
  const latestProducts = await getLatestProducts();
  const productos = await getProducts();
  res.render('cliente/index.html', { title: 'Inicio',uploadsURL: process.env.UPLOADED_IMAGES_URL, recientes: latestProducts, productos: productos, categorias: cats});
});
/* GET inventario page. */
router.get('/inventario/:clase?/:categoria?', async function(req, res, next) {
  const vClasses = await getClasses();
  console.log(req.query);
  const vClass = req.query.clase || false;
  const id = req.query.categoria || false;
  let productos = [];
  let cats = [];
  if (!vClass)
    productos = await getProducts();
  else {
    cats = await getCategoriesOfClass(vClass);
    if (!id) {
      productos = await getProductsOfClass(vClass);
    } else {
      productos = await getProductsOfCategory(Number(id));
    }
  }
  res.render('cliente/inventory.html', { title: 'Inventario',uploadsURL: process.env.UPLOADED_IMAGES_URL, products: productos, categorias: cats, categoriaSelect: Number(id), tipoSelect:vClass, tipos: Object.values(vClasses) });
});

router.get('/inventario/producto/:id', async function (req, res) {
  const id = req.params.id;
  const producto = await getProductById(Number(id));
  res.render('cliente/product.html', { title: 'Producto',uploadsURL: process.env.UPLOADED_IMAGES_URL, product: producto});
});


module.exports = router;