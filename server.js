const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var moment = require('moment');



const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  var month = moment().format('M');
  var day = moment().unix(Number);
  var year = moment().format('YY');
  var time = moment().format('LT');
  var total = (month * day * year) % 255;
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    homeMessage: 'sup dog',
    month,
    day,
    year,
    total,
    time
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res)=> {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  })
});
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
