import nunjucks from 'nunjucks'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import productsRouter from './routes/products.js'
import categoriesRouter from './routes/categories.js'
import imagesRouter from './routes/images.js'
var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productsRouter);
app.use('/categorias', categoriesRouter);
app.use('/imagenes', imagesRouter);



export default app;
