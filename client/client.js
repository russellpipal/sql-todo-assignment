var app = angular.module('myApp', []);

app.controller('MainController', ['$http', function($http){
  var main = this;
  main.todos = [];
  main.todoText = '';

  getTodos = function(){
    $http.get('/todo').then(function(request, response){
      main.todos = response.data;
    });
  };

  main.addTodo = function(){
    $http.post('/todo', {todo: main.todoText, done: false}).then(getTodos);
  };

  getTodos();
}]);
