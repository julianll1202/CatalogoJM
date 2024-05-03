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
router.get('/inventario/producto/:id', async function (req, res) {
  const id = req.params.id;
  const producto = await getProductById(Number(id));
  res.render('cliente/product.html', { title: 'Producto',uploadsURL: process.env.UPLOADED_IMAGES_URL, product: producto});
});
/* GET inventario page. */
router.get('/inventario/:clase?/:categoria?', async function(req, res, next) {
  console.log(req.query);
  const vClass = req.query.clase || false;
  const id = req.query.categoria || false;
  let productos = [];
  let cats = [];
  let vClasses = [];
  if (!vClass) {
    productos = await getProducts();
    vClasses = await getClasses();
    vClasses = Object.values(vClasses);
    vClasses = vClasses.map((v) => JSON.parse(JSON.stringify({id: v, text: v.toLowerCase().replace('_', ' ')})));
    console.log(vClasses);
  } else {
    cats = await getCategoriesOfClass(vClass);
    if (!id) {
      productos = await getProductsOfClass(vClass);
    } else {
      productos = await getProductsOfCategory(Number(id));
    }
  }
  res.render('cliente/inventory.html', { title: 'Inventario',uploadsURL: process.env.UPLOADED_IMAGES_URL, products: productos, categorias: cats, categoriaSelect: Number(id), tipoSelect:vClass, tipos: vClasses });
});



module.exports = router;