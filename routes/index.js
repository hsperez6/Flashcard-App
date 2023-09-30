const express = require('express')
const router = express.Router();

/****************************************************
 * ROUTES
***************************************************/
router.get('/', (req, res) => {  
  const name = req.cookies.username;
  if ( name ) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

router.post('/goodbye', (req, res) => {  
  res.clearCookie('username');
  res.redirect('/hello');
});

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/')
  } else {
    res.render('hello')
  }
});

router.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

router.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb?" })
});

module.exports = router; 