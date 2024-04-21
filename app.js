import nunjucks from 'nunjucks'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import clientRouter from './routes/client.js'
import adminRouter from './routes/admin.js'
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

app.use('/', clientRouter);
app.use('/admin', adminRouter);



export default app;
