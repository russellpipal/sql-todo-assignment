var router = require('express').Router();
var path = require('path');
var todoRouter = require('./todoRouter');

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/todo', todoRouter);

module.exports = router;
