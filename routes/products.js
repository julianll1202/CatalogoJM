var express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct, getProductById, getProductsOfCategory } = require('../controllers/productController');
const { getCategories } = require('../controllers/categoryController');
const { authenticateToken } = require('../services/authentication');
const { getUserById } = require('../controllers/userController');
var router = express.Router();

/* HTML Views */
router.get('/', authenticateToken, async function(req, res, next) {
  const user = await getUserById(req.payload.userId)
  console.log(user)
  const productos = await getProducts();
  const cats = await getCategories();
  res.render('catalogue.html', { title: 'Productos', categories: cats,  uploadsURL: process.env.UPLOADED_IMAGES_URL, products: productos, usuario: user});
});

router.get('/categoria/:name', authenticateToken, async function(req, res, next) {
  const nombre = req.params.name;
  let productos = []
  if (nombre === '' || nombre === undefined)
    productos = await getProducts();
  else
    productos = await getProductsOfCategory(Number(nombre));
  if (productos.length > 0)
    res.status(201).send(productos);
  else
    res.status(400).send([]);
});

router.get('/agregar', authenticateToken, async function(req, res, next) {
  const user = await getUserById(req.payload.userId)
  const cats = await getCategories();
  res.render('addProduct.html', { title: 'Agregar producto', categories: cats, usuario: user });
});

router.get('/actualizar/:id', authenticateToken, async function(req, res, next) {
  const user = await getUserById(req.payload.userId)
  const prodId = req.params.id;
  const prod = await getProductById(Number(prodId));
  const cats = await getCategories();
  console.log(prod);
  res.render('editProduct.html', { title: 'Actualizar producto', uploadsURL: process.env.UPLOADED_IMAGES_URL, usuario: user, product: prod, categories: cats});
});


// CRUD operations
router.post('/crear', authenticateToken, async function(req, res, next) {
  const prodInfo = req.body
  console.log(prodInfo)
  const product = await addProduct(prodInfo)
  if (product !== 'Product not added')
    res.status(201).send(product);
  else
    res.status(400).send();
  });

router.put('/actualizar', authenticateToken, async function(req, res, next) {
  const prodInfo = req.body
  const product = await updateProduct(prodInfo)
  if (product !== 'Product not updated')
    res.status(200).send(product);
  else
    res.status(400).send();
});

router.delete('/eliminar/:id', authenticateToken, async function(req, res, next) {
  const prodId = req.params.id
  const product = await deleteProduct(Number(prodId))
  if (product !== 'Product not deleted')
    res.status(200).send(product);
  else
    res.status(400).send();
});

module.exports = router;