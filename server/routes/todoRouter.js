var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;

var todoResults = [];

router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.error(err);
      response.sendStatus(500);
    } else {
      var todo = request.body.todo;
      var complete = request.body.complete;

      var query = client.query('INSERT INTO todos (todo, complete) VALUES ($1, $2) ' +
                                'RETURNING todo, complete', [todo, complete]);

      query.on('end', function() {
        done();
        response.sendStatus(200);
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        response.status(500).send(error);
      });
    }
  });
});

router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM todos');

      query.on('row', function(row){
        todoResults.push(row);
      });

      query.on('end', function(){
        done();
        response.send(todoResults);
      });

      query.on('error', function(error){
        console.log('Error on get', error);
        done();
        respone.sendStatus(500);
      });
    }
  });
});

module.exports = router;
