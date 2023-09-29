const express = require('express');
const bodyParser = require('body-parser')

const app = express();


app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));


const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];


// Routes
app.get('/', (req, res) => {
  res.render('index')
});

app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb?", colors })
});

app.get('/hello', (req, res) => {
  res.render('hello')
});

app.post('/hello', (req, res) => {
  console.dir(req.body)
  res.render('hello')
});

app.listen(3000, () => {
  console.log('App is running on localhost:3000')
});