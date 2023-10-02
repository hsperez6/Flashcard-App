const express = require('express');
const app = express();

/****************************************************
 * SETTINGS AND DEPENDENCIES
***************************************************/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/static', express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');


/****************************************************
 * ROUTERS
***************************************************/
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

/****************************************************
 * 404 ERROR CONSTRUCTOR
***************************************************/
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
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