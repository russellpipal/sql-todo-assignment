var express = require('express');
var bodyParser = require('body-parser');
var initializeDB = require('./db/connection').initializeDB;

var app = express();

var index = require('./routes/indexRouter');

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/', index);

initializeDB();

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('Listening on port', port);
});
