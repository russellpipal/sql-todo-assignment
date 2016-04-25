var app = angular.module('myApp', []);

app.controller('MainController', ['$http', function($http){
  var main = this;
  main.todoText = '';
  main.todos = [];
  main.deleteShown = false;

  getTodos = function(){
    $http.get('/todo').then(function(response){
      main.todos = response.data;
      main.todoText = '';
    });
  };

  main.addTodo = function(){
    $http.post('/todo', {todo: main.todoText, complete: false}).then(getTodos);
  };

  main.deleteTodo = function(currentTodo){
    $http.delete('/todo/delete/' + currentTodo.id).then(getTodos);
  };

  main.completeTodo = function(currentTodo){
    $http.put('/todo/complete/' + currentTodo.id).then(getTodos);
  };

  main.showDelete = function(currentTodo){
    currentTodo.deleteShown = true;
  };

  main.cancelDelete = function(currentTodo){
    currentTodo.deleteShown = false;
  };

  getTodos();
}]);
