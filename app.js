const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './views');

const routes = require('./routes')

app.use(routes);

/****************************************************
 * 404 ERROR 
***************************************************/
app.use((req, res, next) => {
	const  err  =  new  Error('Not Found');
	err.status  =  404;
	next(err);
});

/****************************************************
 * ERROR HANDLER
***************************************************/
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

/****************************************************
 * SERVER
***************************************************/
app.listen(3000, () => {
  console.log('App is running on localhost:3000')
});