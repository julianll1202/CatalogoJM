var express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { addCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
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
  const catInfo = req.body
  const category = await addCategory(catInfo)
  if (category !== 'Category not created')
    res.status(201).send(category);
});

router.put('/actualizar', async function(req, res, next) {
  const catInfo = req.body
  const category = await updateCategory(catInfo)
  if (category !== 'Category not updated')
    res.status(200).send(category);
});

router.delete('/eliminar/:id', async function(req, res, next) {
  const catId = req.params.id
  const category = await deleteCategory(catId)
  if (category !== 'Category not deleted')
    res.status(201).send(category);
});

module.exports = router;