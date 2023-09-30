const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './views');


// Routes *****************************************

app.use((req, res, next) => {
  console.log('Hello');
  const err = new Error('Oh no!');
  next();
});

app.use((req, res, next) => {
  console.log('World');
  next();
});


















app.get('/', (req, res) => {  
  const name = req.cookies.username;
  if ( name ) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

app.post('/goodbye', (req, res) => {  
  res.clearCookie('username');
  res.redirect('/hello');
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/')
  } else {
    res.render('hello')
  }
});

app.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb?" })
});


// Server **************************************************
app.listen(3000, () => {
  console.log('App is running on localhost:3000')
});