var express = require('express');
const { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require('../controllers/categoryController');
const { getUserById } = require('../controllers/userController');
const { authenticateToken } = require('../services/authentication');
var router = express.Router();

/* HTML Views */
router.get('/', authenticateToken, async function(req, res, next) {
  const user = await getUserById(req.payload.userId)
  const categories = await getCategories();
  console.log(categories)
  res.render('categories.html', { title: 'Productos', usuario: user.userName, categories: categories });
});

router.get('/agregar', authenticateToken, async function(req, res, next) {
  const user = await getUserById(req.payload.userId)
  res.render('addCategory.html', { title: 'Agregar categoría', usuario: user.userName });
});

router.get('/actualizar/:id', authenticateToken, async function(req, res, next) {
  const user = await getUserById(req.payload.userId)
  const catId = req.params.id;
  const cat = await getCategoryById(Number(catId));
  res.render('editCategory.html', { title: 'Actualizar categoría', category: cat, usuario: user.userName});
});


// CRUD operations
router.post('/crear', authenticateToken, async function(req, res, next) {
  const catInfo = req.body
  const category = await addCategory(catInfo)
  if (category !== 'Category not created')
    res.status(201).send(category);
});

router.put('/actualizar', authenticateToken, async function(req, res, next) {
  const catInfo = req.body
  const category = await updateCategory(catInfo)
  if (category !== 'Category not updated')
    res.status(200).send(category);
  else
    res.status(400).send();
});

router.delete('/eliminar/:id', authenticateToken, async function(req, res, next) {
  const catId = req.params.id
  const category = await deleteCategory(Number(catId))
  if (category !== 'Category not deleted')
    res.status(200).send(category);
  else
    res.status(400).send();
});

module.exports = router;