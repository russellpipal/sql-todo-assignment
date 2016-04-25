var app = angular.module('myApp', []);

app.controller('MainController', ['$http', function($http){
  var main = this;
  main.todoText = '';
  main.todos = [];

  getTodos = function(){
    $http.get('/todo').then(function(response){
      main.todos = [];
      main.todos = response.data;
      console.log(response.data);
      main.todoText = '';
    });
  };

  main.addTodo = function(){
    $http.post('/todo', {todo: main.todoText, complete: false}).then(getTodos);
  };

  getTodos();
}]);
