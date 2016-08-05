'use strict';

console.log('process.end.PWD', process.env.PWD);
const PORT = process.env.PORT || 8000;

const express = require('express'),
request = require('request');

const bodyParser = require('body-parser');
const Cat = require('./models/cat');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());





app.set('view engine', 'pug'); //which engine for res.render to use
app.set('views' , './views' ) //directory where pug files are located

app.get('/', (req, res, next) => {
	res.render('index', { "title": 'My Awesome Page' });
//finds the index.pug file in the views directory, renders to HTML and sends it
})




//location parameter and anonoymous function
app.get('/', function(req, res) {
  res.send("<h1>Pink Panther</h1>");
});


app.route('/cats')
.get((req, res) => {
  // Get all cats
  Cat.getAll(function(err, cats) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(cats);
    }
  });
})
.post((req, res) => {
  Cat.create(req.body, function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('cat created!\n');
    }
  });
});


app.route('/cats/:id')
.get((req, res) => {
  Cat.getOne(req.params.id, function(err, catObj){
    if(err){
      res.status(400).send(err);
    } else {
      res.send(catObj);
    }
  })
  // res.send(`Here is cat #${req.params.id}! \n`)
})
.put((req, res) => {

  let catId = req.params.id;
  let updateObj = req.body;

  Cat.update(catId, updateObj, function(err, newCat) {
    if(err){
      res.status(400).send(err);
    } else {
      res.send(newCat);
    }
  });


  // Cat.modifyOne(req.params.id, function(err, catObj, cb){
  //   if(err){
  //     res.status(400).send(err);
  //   } else {
  //     res.send(catObj);
  //   }
  // })
  // res.send(`Editing cat #${req.params.id}!`)
})
.delete((req, res) => {
  Cat.deleteOne(req.params.id, function(err, catObj){
    if(err){
      res.status(400).send(err);
    } else {
      res.send(catObj);
    }
  })
  // res.send(`Delete cat #${req.params.id}!`)
});

app.listen(`${PORT}`, function() {
  console.log(`The server is running on port ${PORT}`);
});
