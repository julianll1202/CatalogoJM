var express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
var router = express.Router();

/* HTML Views */
router.get('/', async function(req, res, next) {
  const productos = await getProducts();
  res.render('catalogue.html', { title: 'Productos' });
});

router.get('/agregar', function(req, res, next) {
  res.render('addProduct.html', { title: 'Agregar producto' });
});

router.get('/actualizar', function(req, res, next) {
  res.render('addProduct.html', { title: 'Actualizar producto' });
});


// CRUD operations
router.post('/crear', async function(req, res, next) {
  const prodInfo = req.body
  const product = await addProduct(prodInfo)
  if (product !== 'Product not added')
    res.status(201).send(product);
});

router.put('/actualizar', async function(req, res, next) {
  const prodInfo = req.body
  const product = await updateProduct(prodInfo)
  if (product !== 'Product not updated')
    res.status(200).send(product);
});

router.delete('/eliminar', async function(req, res, next) {
  const prodId = req.params.id
  const product = await deleteProduct(prodId)
  if (product !== 'Product not deleted')
    res.status(201).send(product);
});

module.exports = router;