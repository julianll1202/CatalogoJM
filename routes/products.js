var express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');
const { getCategories } = require('../controllers/categoryController');
var router = express.Router();

/* HTML Views */
router.get('/', async function(req, res, next) {
  const productos = await getProducts();
  const cats = await getCategories();
  res.render('catalogue.html', { title: 'Productos', categories: cats,  uploadsURL: process.env.UPLOADED_IMAGES_URL, products: productos});
});

router.get('/agregar', async function(req, res, next) {
  const cats = await getCategories();
  res.render('addProduct.html', { title: 'Agregar producto', categories: cats });
});

router.get('/actualizar/:id', async function(req, res, next) {
  const prodId = req.params.id;
  const prod = await getProductById(Number(prodId));
  const cats = await getCategories();
  res.render('editProduct.html', { title: 'Actualizar producto', uploadsURL: process.env.UPLOADED_IMAGES_URL, product: prod, categories: cats});
});


// CRUD operations
router.post('/crear', async function(req, res, next) {
  const prodInfo = req.body
  console.log(prodInfo)
  const product = await addProduct(prodInfo)
  if (product !== 'Product not added')
    res.status(201).send(product);
  else
    res.status(400).send();
  });

router.put('/actualizar', async function(req, res, next) {
  const prodInfo = req.body
  const product = await updateProduct(prodInfo)
  if (product !== 'Product not updated')
    res.status(200).send(product);
});

router.delete('/eliminar/:id', async function(req, res, next) {
  const prodId = req.params.id
  const product = await deleteProduct(Number(prodId))
  if (product !== 'Product not deleted')
    res.status(200).send(product);
});

module.exports = router;