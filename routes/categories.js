var express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require('../controllers/categoryController');
var router = express.Router();

/* HTML Views */
router.get('/', async function(req, res, next) {
  const categories = await getCategories();
  console.log(categories)
  res.render('categories.html', { title: 'Productos', categories: categories });
});

router.get('/agregar', function(req, res, next) {
  res.render('addCategory.html', { title: 'Agregar categoría' });
});

router.get('/actualizar/:id', async function(req, res, next) {
  const catId = req.params.id;
  const cat = await getCategoryById(Number(catId));
  res.render('editCategory.html', { title: 'Actualizar categoría', category: cat});
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
  else
    res.status(400).send();
});

router.delete('/eliminar/:id', async function(req, res, next) {
  const catId = req.params.id
  const category = await deleteCategory(Number(catId))
  if (category !== 'Category not deleted')
    res.status(200).send(category);
  else
    res.status(400).send();
});

module.exports = router;